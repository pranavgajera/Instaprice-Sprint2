import os
import flask
import flask_socketio
import flask_sqlalchemy
import psycopg2
from flask import request
from dotenv import load_dotenv
from api_calls import mock_search_response, mock_price_history
from db_writes import user_write, price_write
import models
from api_calls import mock_search_response
from api_calls import mock_price_history
import json

SEARCH_REQUEST_CHANNEL = "search request"
SEARCH_RESPONSE_CHANNEL = "search response"
PRICE_HISTORY_REQUEST_CHANNEL = 'price history request'
PRICE_HISTORY_RESPONSE_CHANNEL = 'price history response'
FEED_UPDATE_CHANNEL = 'its feeding time'

app = flask.Flask(__name__)
app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

SQL_USER = os.environ["SQL_USER"]
SQL_PWD = os.environ["SQL_PASSWORD"]
DBUSER = os.environ["USER"]
DATABASE_URI = os.environ["DATABASE_URL"]
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app
db.create_all()
db.session.commit()

def emit_all_items(channel):
    all_itemnames = [db_itemname.itemname for db_itemname in db.session.query(models.Queries).all()]
    all_itemids = [db_itemid.itemid for db_itemid in db.session.query(models.Queries).all()]
    all_currprice = [db_currprice.currprice for db_currprice in db.session.query(models.Queries).all()]
    all_graphimgs = [db_graphimg.graphimg for db_graphimg in db.session.query(models.Queries).all()]
    all_productimgs = [db_productimg.productimg for db_productimg in db.session.query(models.Queries).all()]
    all_producturls = [db_producturl.producturl for db_producturl in db.session.query(models.Queries).all()]

    socketio.emit(
        channel,
        {
            "allItemnames": all_itemnames,
            "allItemids": all_itemids,
            "allCurrprice": all_currprice,
            "allGraphimgs": all_graphimgs,
            "allProductimgs": all_productimgs,
            "allProducturls": all_producturls,
        },
    )
    

@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('new google user')
def on_new_google_user(data):
    print("Got an event for new google user input with data:", data)
    print('Someone connected! with google')
    user_write(data)
    socketio.emit('connected', {
        'username': data['name'],
        'email': data['email'],
        'profilepicture': data['profilepicture']
    }, room=request.sid)
    emit_all_items(FEED_UPDATE_CHANNEL)

@socketio.on('disconnect')
def on_disconnect():
    print('Someone disconnected!')

@socketio.on(SEARCH_REQUEST_CHANNEL)
def search_request(data):
    print("Got an event for search request with data: ", data)
    search_list = mock_search_response(data['query'])
    socketio.emit(SEARCH_RESPONSE_CHANNEL, {
        "search_list": search_list
    }, room=request.sid)
    
@socketio.on(PRICE_HISTORY_REQUEST_CHANNEL)
def get_price_history(data):
    print(data['ASIN'])
    price_history = mock_price_history(data['ASIN'])
    return_array = []
    for i in range(0, len(price_history)-1):
        if price_history[i+1]["price"] - price_history[i]["price"] >= 1:
            return_array.append(price_history[i])
    # price_history = price_history[len(price_history)-10:len(price_history)]
    print(json.dumps(return_array, indent=4))
    print("Got an event for price history search with data: ", data)
    price_write(data)
    emit_all_items(FEED_UPDATE_CHANNEL)
    socketio.emit(PRICE_HISTORY_RESPONSE_CHANNEL, {
        "pricehistory": return_array,
        'ASIN': data['ASIN']
    }, room=request.sid)
    
@socketio.on('new item')
def on_newitem(data):
    print('new item recieved:',data["item"])

@socketio.on('post price history')
def post_price_history(data):
    socketio.emit('post', {
        'pricehistory': data['priceHistory'] 
    })
    print("This is the price history:", data['priceHistory'])

@socketio.on('ignore price history')
def ignore_price_history(data):
    socketio.emit('ignored', {
        'ignored': "true"
    })
    print("Ignore the price history:", data['ignore'])

@socketio.on('go to live feed')
def go_to_live_feed(data):
    socketio.emit('live feed', {
        'sid': request.sid
    })
    print("Going to live feed with: ", request.sid)

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )