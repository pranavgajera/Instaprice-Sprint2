"""Flask backend for InstaPrice"""
import json
import os
from datetime import datetime
import flask
import flask_socketio
import flask_sqlalchemy
from flask import request, jsonify
from sqlalchemy import text
from flask import request
import numpy as np
from api_calls import search_amazon
from api_calls import fetch_price_history
from api_calls import mock_search_response
from api_calls import mock_price_history
from db_writes import price_write
from db_writes import get_item_data

SEARCH_REQUEST_CHANNEL = "search request"
SEARCH_RESPONSE_CHANNEL = "search response"
PRICE_HISTORY_REQUEST_CHANNEL = 'price history request'
PRICE_HISTORY_RESPONSE_CHANNEL = 'price history response'
FEED_UPDATE_CHANNEL = 'its feeding time'
COMMENT_UPDATE_CHANNEL = "fetching comments"

APP = flask.Flask(__name__)
SOCKETIO = flask_socketio.SocketIO(APP)
SOCKETIO.init_app(APP, cors_allowed_origins="*")

DATABASE_URI = os.getenv("DATABASE_URL")
APP.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI

DB = flask_sqlalchemy.SQLAlchemy(APP)
DB.init_app(APP)
DB.app = APP

import models

def emit_all_items(channel):
    """socket emits information on every item in the database"""

    all_itemnames = []
    all_imageurls = []
    all_currprices = []
    all_usernames = []
    all_pfps = []
    all_times = []
    all_post_ids = []
    all_likes = []
    all_asins = []
    for post in DB.session.query(models.Posts).all():
        all_itemnames.append(post.itemname)
        all_imageurls.append(post.imageurl)
        all_currprices.append(post.currprice)
        all_usernames.append(post.username)
        all_pfps.append(post.pfp)
        all_times.append(post.time)
        all_post_ids.append(post.id)
        all_likes.append(post.likes)
        all_asins.append(post.asin)
    
    SOCKETIO.emit(
        channel,
        {
            "allItemnames": all_itemnames,
            "allImageurls": all_imageurls,
            "allCurrprices": all_currprices,
            "allUsernames": all_usernames,
            "allPfps": all_pfps,
            "allTimes": all_times,
            "allLikes": all_likes,
            "allAsins": all_asins,
            "allPostIDs": all_post_ids,
        },
    )

def emit_comments(post_id):
    """Emits all comments for a given post"""
    print("Attempting to fetch comments for post: {}".format(post_id))

    # Fetch usernames, pfps, comments, and commentID's
    all_comment_ids = []
    all_usernames = []
    all_pfps = []
    all_comment_texts = []

    # Get comments that match the post's ID
    for comment in DB.session.query(models.Comment).filter_by(post_id=post_id).all():
        all_comment_ids.append(comment.comment_id)
        all_usernames.append(comment.username)
        all_pfps.append(comment.pfp)
        all_comment_texts.append(comment.comment_text)

    SOCKETIO.emit(
        COMMENT_UPDATE_CHANNEL,
        {
            "postID": post_id,
            "allCommentIDs": all_comment_ids,
            "allUsernames": all_usernames,
            "allPfps": all_pfps,
            "allCommentTexts": all_comment_texts,
        },
    )

@APP.route('/')
def hello():
    """load webpage from html"""
    return flask.render_template('index.html')

@APP.errorhandler(404)
def cool(e):
    """load webpage from html"""
    return flask.render_template('index.html')

@SOCKETIO.on('new user')
def on_new_google_user(data):
    """authenticates user and sends them their user information"""
    print("Got an event for new user input with data:", data)
    print('Someone connected!')
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
    if data['query'] == "":
        search_list = mock_search_response(data['query'])
    else:
        search_list = search_amazon(data['query'])
    # print(search_list)
    # search_amazon(data['query'])
    SOCKETIO.emit(SEARCH_RESPONSE_CHANNEL, {
        "search_list": search_list
    }, room=request.sid)

@SOCKETIO.on(PRICE_HISTORY_REQUEST_CHANNEL)
def get_price_history(data):
    """send price histoy request to api_calls with given data"""
    # price_history = mock_price_history(data['ASIN'])
    price_history = fetch_price_history(data['ASIN'])
    # print(price_history)
    if "404" in price_history:
        SOCKETIO.emit(PRICE_HISTORY_RESPONSE_CHANNEL, {
            "pricehistory": price_history,
            'ASIN': data['ASIN'],
            'title': data['title'],
            'imgurl': data['imgurl'],
            'username': data['username'],
            'pfp': data['pfp'],
            'error':True,
            'min':0,
            'max':0,
            'mean_price':0,
            'var_price':0,
        }, room=request.sid)
        emit_all_items(FEED_UPDATE_CHANNEL)
        return
    return_array = []
    statistical_array =[]
    for i in range(0,len(price_history)-1):
        statistical_array.append(int(price_history[i]["price"]))
    min_price = min(statistical_array)
    max_price = max(statistical_array)
    mean_price = np.mean(statistical_array)
    var_price = np.var(statistical_array)
    return_array.append(price_history[0])
    for i in range(0, len(price_history) - 1):
        if price_history[i + 1]["price"] != price_history[i]["price"]:
            return_array.append(price_history[i + 1])
    if len(return_array) == 0:
        return_array.append(price_history[len(price_history) - 1])
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
        'pfp': data['pfp'],
        'error':False,
        'min':min_price,
        'max':max_price,
        'mean_price':mean_price,
        'var_price':var_price
    }, room=request.sid)
    emit_all_items(FEED_UPDATE_CHANNEL)

@SOCKETIO.on('get profile page')
def get_profile_page(data):
    #make it so that i can loop through db with data['username'] and find only those posts then make Feed in propage with those posts as well as display propic name and other stuff
    itemnames = []
    imageurls = []
    pricehists = []
    usernames = []
    pfps = []
    times = []
    posts = DB.session.query(models.Posts).filter_by(username=data['username']).all()
    for post in posts:
        itemnames.append(post.itemname)
        imageurls.append(post.imageurl)
        pricehists.append(post.pricehist)
        usernames.append(post.username)
        pfps.append(post.pfp)
        times.append(post.time)
    SOCKETIO.emit('make profile page', {
        'username': data['username'],
        'itemnames': itemnames,
        'imageurls': imageurls,
        'pricehists': pricehists,
        'usernames': usernames,
        'pfps': pfps,
        'times': times,
    })
    print ("This is the profile page for: " + data['username'])

@SOCKETIO.on('go back')
def go_back():
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

@SOCKETIO.on('detail view request')
def get_post_details(data):
    """sends itemname to database, and fetches
    graph data, and math"""
    item_data = get_item_data(data['title'])
    print('request for: ')
    print(data['title'])
    SOCKETIO.emit('detail view response', {
        "pricehistory": item_data['pricehistory'],
        'asin': item_data['asin'],
        'itemname': item_data['itemname'],
        'imgurl': item_data['imgurl'],
        'mean': item_data['meanprice'],
        'variance': item_data['varianceprice'],
        'min_price': item_data['minprice'],
        'max_price': item_data['maxprice'],
        'username': item_data['user'],
        'pfp': item_data['pfp'],
        'graphurl': item_data['graphurl'],
        'likes': item_data['likes'],
        'dataset': item_data['dataset'],
        'datapts': item_data['datapts']
    }, room=request.sid)
    
    # Comments now loaded with post details
    emit_comments(item_data["post_id"])

@SOCKETIO.on("post comment")
def post_comment(data):
    """Posts a given comment to the comments"""
    print("COMMENT POST:{}".format(data))
    # Add comment to DB
    the_comment = models.Comment(
        data["post_id"], data["username"], data["pfp"], data["comment_text"]
    )
    DB.session.add(the_comment)
    DB.session.commit()
    # Update comments client-side
    emit_comments(data["post_id"])

if __name__ == '__main__':
    # Don't test with these
    DB.create_all()
    DB.session.commit()
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', '8080')),
        debug=True
    )