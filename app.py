"""Flask backend for InstaPrice"""
import json
import os
from datetime import datetime
import flask
import flask_socketio
import flask_sqlalchemy
from flask import request

from api_calls import search_amazon
from api_calls import fetch_price_history
from api_calls import mock_search_response
from api_calls import mock_price_history
from db_writes import price_write

SEARCH_REQUEST_CHANNEL = "search request"
SEARCH_RESPONSE_CHANNEL = "search response"
PRICE_HISTORY_REQUEST_CHANNEL = 'price history request'
PRICE_HISTORY_RESPONSE_CHANNEL = 'price history response'
FEED_UPDATE_CHANNEL = 'its feeding time'

APP = flask.Flask(__name__)
APP = flask.Flask(__name__)
SOCKETIO = flask_socketio.SocketIO(APP)
SOCKETIO.init_app(APP, cors_allowed_origins="*")

DATABASE_URI = os.environ["DATABASE_URL"]
APP.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI

DB = flask_sqlalchemy.SQLAlchemy(APP)
DB.init_app(APP)
DB.app = APP

import models
DB.create_all()
DB.session.commit()

def emit_all_items(channel):
    """socket emits information on every item in the database"""
    all_itemnames = [
        db_itemname.itemname for db_itemname in DB.session.query(
            models.Posts).all()]
    all_imageurls = [
        db_imageurl.imageurl for db_imageurl in DB.session.query(
            models.Posts).all()]
    all_pricehists = [
        db_pricehist.pricehist for db_pricehist in DB.session.query(
            models.Posts).all()]
    all_usernames = [
        db_username.username for db_username in DB.session.query(
            models.Posts).all()]
    all_pfps = [db_pfp.pfp for db_pfp in DB.session.query(models.Posts).all()]
    all_times = [
        db_time.time for db_time in DB.session.query(
            models.Posts).all()]

    SOCKETIO.emit(
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

@APP.route('/')
def hello():
    """load webpage from html"""
    return flask.render_template('index.html')

@SOCKETIO.on('new google user')
def on_new_google_user(data):
    """authenticates user and sends them their user information"""
    print("Got an event for new google user input with data:", data)
    print('Someone connected! with google')
    SOCKETIO.emit('connected', {
        'username': data['name'],
        'email': data['email'],
        'profilepicture': data['profilepicture']
    }, room=request.sid)
    emit_all_items(FEED_UPDATE_CHANNEL)

@SOCKETIO.on('disconnect')
def on_disconnect():
    """disconnect"""
    print('Someone disconnected!')

@SOCKETIO.on(SEARCH_REQUEST_CHANNEL)
def search_request(data):
    """send a search request to api_calls with given data"""
    print("Got an event for search request with data: ", data)
    #search_list = mock_search_response(data['query'])
    search_list = mock_search_response(data['query'])
    # print(search_list)
    print(json.dumps(search_list, indent=4))

    # search_amazon(data['query'])

    SOCKETIO.emit(SEARCH_RESPONSE_CHANNEL, {
        "search_list": search_list
    }, room=request.sid)

@SOCKETIO.on(PRICE_HISTORY_REQUEST_CHANNEL)
def get_price_history(data):
    """send price histoy request to api_calls with given data"""
    print(data['ASIN'])
    #price_history = mock_price_history(data['ASIN'])
    price_history = mock_price_history(data['ASIN'])
    return_array = []
    return_array.append(price_history[0])
    for i in range(0, len(price_history) - 1):
        if price_history[i + 1]["price"] != price_history[i]["price"]:
            return_array.append(price_history[i + 1])
    # price_history = price_history[len(price_history)-10:len(price_history)]
    # print(json.dumps(return_array, indent=4))
    if len(return_array) >= 11:
        return_array = return_array[len(
            return_array) - 11: len(return_array) - 1]
    print("Got an event for price history search with data: ", data)
    SOCKETIO.emit(PRICE_HISTORY_RESPONSE_CHANNEL, {
        "pricehistory": return_array,
        'ASIN': data['ASIN'],
        'title': data['title'],
        'imgurl': data['imgurl'],
        'username': data['username'],
        'pfp': data['pfp']
    }, room=request.sid)
    emit_all_items(FEED_UPDATE_CHANNEL)

@SOCKETIO.on('post price history')
def post_price_history(data):
    """sends post information to database, updates posts, and
    sends updated list of posts to users"""
    post_list = []
    # postList.update({data['ASIN']: data['priceHistory']})
    post_list.append(data['priceHistory'])
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M")
    data['time'] = dt_string
    price_write(data)
    print("This is the price history:", data['ASIN'], data['priceHistory'])
    emit_all_items(FEED_UPDATE_CHANNEL)

if __name__ == '__main__':
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', '8080')),
        debug=True
    )
    