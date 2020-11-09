import os
import flask
import flask_socketio
import flask_sqlalchemy
import psycopg2
from flask import request
from dotenv import load_dotenv
from api_calls import mock_search_response, mock_price_history
from db_writes import user_write, price_write

SEARCH_REQUEST_CHANNEL = "search request"
SEARCH_RESPONSE_CHANNEL = "search response"
PRICE_HISTORY_REQUEST_CHANNEL = 'price history request'
PRICE_HISTORY_RESPONSE_CHANNEL = 'price history response'

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
    })

@socketio.on('disconnect')
def on_disconnect():
    print('Someone disconnected!')

@socketio.on(SEARCH_REQUEST_CHANNEL)
def search_request(data):
    print("Got an event for search request with data: ", data)
    search_list = mock_search_response(data['query'])
    # search_amazon(data['query'])
    socketio.emit(SEARCH_RESPONSE_CHANNEL, {
        "search_list": search_list
    }, room=request.sid)
    
@socketio.on(PRICE_HISTORY_REQUEST_CHANNEL)
def get_price_history(data):
    print("Got an event for price history search with data: ", data)
    price_write(data)
    
@socketio.on('new item')
def on_newitem(data):
    print('new item recieved:',data["item"])

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )