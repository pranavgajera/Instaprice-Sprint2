import os
import flask
import flask_socketio
import flask_sqlalchemy
import psycopg2
from flask import request
from dotenv import load_dotenv
from api_calls import mock_search_response, mock_price_history
from db_writes import price_write
import models
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
    all_itemnames = [db_itemname.itemname for db_itemname in db.session.query(models.Posts).all()]
    all_imageurls = [db_imageurl.imageurl for db_imageurl in db.session.query(models.Posts).all()]
    all_pricehists = [db_pricehist.pricehist for db_pricehist in db.session.query(models.Posts).all()]
    all_usernames = [db_username.username for db_username in db.session.query(models.Posts).all()]
    all_pfps = [db_pfp.pfp for db_pfp in db.session.query(models.Posts).all()]
    all_times = [db_time.time for db_time in db.session.query(models.Posts).all()]
    
    socketio.emit(
        channel,
        {
            "allItemnames": all_itemnames,
            "allImageurls": all_imageurls,
            "allPricehists": all_pricehists,
            "allUsernames": all_usernames,
            "allPfps": all_pfps,
            "allTimes": all_times,
        },
    )
  
@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('new google user')
def on_new_google_user(data):
    print("Got an event for new google user input with data:", data)
    print('Someone connected! with google')
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
    socketio.emit(PRICE_HISTORY_RESPONSE_CHANNEL, {
        "pricehistory": return_array,
        'ASIN': data['ASIN'],
        'title': data['title'],
        'imgurl': data['imgurl']
    }, room=request.sid)
    emit_all_items(FEED_UPDATE_CHANNEL)
    
@socketio.on('new item')
def on_newitem(data):
    print('new item recieved:',data["item"])

@socketio.on('post price history')
def post_price_history(data):
    price_write(data)
    socketio.emit('post', {
        'pricehistory': data['priceHistory'] 
    })
    emit_all_items(FEED_UPDATE_CHANNEL)
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