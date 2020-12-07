"""Flask backend for InstaPrice"""
import os
from datetime import datetime
import re
import flask
import flask_socketio
import flask_sqlalchemy
from flask import request
import numpy as np
from api_calls import search_amazon
from api_calls import fetch_price_history
from api_calls import mock_search_response

SEARCH_REQUEST_CHANNEL = "search request"
SEARCH_RESPONSE_CHANNEL = "search response"
PRICE_HISTORY_REQUEST_CHANNEL = "price history request"
PRICE_HISTORY_RESPONSE_CHANNEL = "price history response"
FEED_UPDATE_CHANNEL = "its feeding time"
COMMENT_UPDATE_CHANNEL = "fetching comments"
LATEST_POST_CHANNEL = "latest post"

APP = flask.Flask(__name__)
SOCKETIO = flask_socketio.SocketIO(APP)
SOCKETIO.init_app(APP, cors_allowed_origins="*")

DATABASE_URI = os.getenv("DATABASE_URL")
APP.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI

DB = flask_sqlalchemy.SQLAlchemy(APP)
DB.init_app(APP)
DB.app = APP
import models

def emit_all_items(channel, room=None):
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
        # all_likes.append(post.likes)
        all_asins.append(post.asin)

    for id in all_post_ids:
        likes = DB.session.query(models.Like).filter_by(post_id=id).count()
        all_likes.append(likes)
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
        room=room,
    )

def emit_latest_post():
    """
    function for emitting latest post
    """
    post = DB.session.query(models.Posts).order_by(models.Posts.id.desc()).limit(1)[0]
    SOCKETIO.emit(
        LATEST_POST_CHANNEL,
        {
            "itemname": post.itemname,
            "imageurl": post.imageurl,
            "currprice": post.currprice,
            "username": post.username,
            "pfp": post.pfp,
            "time": post.time,
            "likes": post.likes,
            "ASIN": post.asin,
            "postID": post.id,
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

def emit_likes(post_id, username, room=None):
    """
    Emits like data for a post with given post_id
    and the status of the user's like/dislike button
    """

    likes = DB.session.query(models.Like).filter_by(post_id=post_id).count()
    like_status = like_exists(post_id, username)
    # This is correct
    SOCKETIO.emit(
        "update_likes",
        {
            "postID": post_id,
            "likes": likes,
            "alreadyLiked": like_status,
        },
        room=room,
    )

def emit_profile_stats(username, room=None):
    """
    Emits stats for a given username's profile
    Stats include total counts for Likes, Posts, and Comments
    """
    total_likes = DB.session.query(models.Like).filter_by(username=username).count()
    total_posts = DB.session.query(models.Posts).filter_by(username=username).count()
    total_comments = (
        DB.session.query(models.Comment).filter_by(username=username).count()
    )
    print("total_likes")
    print(total_likes)
    print("total posts")
    print(total_posts)
    print("total_comments")
    print(total_comments)

    # Fetch pfp
    pfp = ""
    if total_posts > 0:
        sample_post = (
            DB.session.query(models.Posts).filter_by(username=username).first()
        )
        pfp = sample_post.pfp
    elif total_comments > 0:
        sample_comment = (
            DB.session.query(models.Comment).filter_by(username=username).first()
        )
        pfp = sample_comment.pfp

    SOCKETIO.emit(
        "update_profile_stats",
        {
            "username": username,
            "total_likes": total_likes,
            "total_posts": total_posts,
            "total_comments": total_comments,
            "pfp": pfp,
        },
        room=room,
    )

@APP.route("/")
def hello():
    """load webpage from html"""
    return flask.render_template("index.html")


@APP.errorhandler(404)
def cool(e):
    """load webpage from html"""
    return flask.render_template("index.html")


@SOCKETIO.on("new user")
def on_new_google_user(data):
    """authenticates user and sends them their user information"""
    print("Got an event for new user input with data:", data)
    print("Someone connected!")
    SOCKETIO.emit(
        "connected",
        {
            "username": data["name"],
            "email": data["email"],
            "profilepicture": data["profilepicture"],
        },
        room=request.sid,
    )
    emit_all_items(FEED_UPDATE_CHANNEL, request.sid)


@SOCKETIO.on("disconnect")
def on_disconnect():
    """disconnect"""
    print("Someone disconnected!")


@SOCKETIO.on(SEARCH_REQUEST_CHANNEL)
def search_request(data):
    """send a search request to api_calls with given data"""
    print("Got an event for search request with data: ", data)
    if data["query"] == "":
        search_list = mock_search_response(data["query"])
    else:
        search_list = search_amazon(data["query"])
    # print(search_list)
    # search_amazon(data['query'])
    SOCKETIO.emit(
        SEARCH_RESPONSE_CHANNEL, {"search_list": search_list}, room=request.sid
    )


@SOCKETIO.on(PRICE_HISTORY_REQUEST_CHANNEL)
def get_price_history(data):
    """send price histoy request to api_calls with given data"""
    # price_history = mock_price_history(data['ASIN'])
    price_history = fetch_price_history(data["ASIN"])
    # print(price_history)
    if "404" in price_history:
        SOCKETIO.emit(
            PRICE_HISTORY_RESPONSE_CHANNEL,
            {
                "pricehistory": price_history,
                "ASIN": data["ASIN"],
                "title": data["title"],
                "imgurl": data["imgurl"],
                "username": data["username"],
                "pfp": data["pfp"],
                "error": True,
                "min": 0,
                "max": 0,
                "mean_price": 0,
                "var_price": 0,
            },
            room=request.sid,
        )
        # emit_all_items(FEED_UPDATE_CHANNEL)        #?????????
        return
    return_array = []
    statistical_array = []
    for i in range(0, len(price_history) - 1):
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
        return_array = return_array[len(return_array) - 11 : len(return_array) - 1]
    print("Got an event for price history search with data: ", data)
    SOCKETIO.emit(
        PRICE_HISTORY_RESPONSE_CHANNEL,
        {
            "pricehistory": return_array,
            "ASIN": data["ASIN"],
            "title": data["title"],
            "imgurl": data["imgurl"],
            "username": data["username"],
            "pfp": data["pfp"],
            "error": False,
            "min": min_price,
            "max": max_price,
            "mean_price": mean_price,
            "var_price": var_price,
        },
        room=request.sid,
    )
    # emit_all_items(FEED_UPDATE_CHANNEL)            #?????????


@SOCKETIO.on("get profile page")
def get_profile_page(data):
    """make it so that i can loop through db with data['username'] and find only those
    posts then make Feed in propage with those posts as well
    as display propic name and other stuff"""
    itemnames = []
    imageurls = []
    pricehists = []
    usernames = []
    pfps = []
    times = []
    currprices = []
    asins = []
    posts = DB.session.query(models.Posts).filter_by(username=data["username"]).all()
    # SOCKETIO.close('get profile page')
    for post in posts:
        itemnames.append(post.itemname)
        imageurls.append(post.imageurl)
        pricehists.append(post.pricehist)
        usernames.append(post.username)
        pfps.append(post.pfp)
        times.append(post.time)
        currprices.append(post.currprice)
        asins.append(post.asin)
    SOCKETIO.emit(
        "make profile page",
        {
            "username": data["username"],
            "itemnames": itemnames,
            "imageurls": imageurls,
            "pricehists": pricehists,
            "usernames": usernames,
            "pfps": pfps,
            "times": times,
            "currprices": currprices,
            "asins": asins,
        },
        room=request.sid,
    )
    print("THIS IS THE PROFILE PAGE FOR: " + data["username"])
    emit_profile_stats(data["username"])


@SOCKETIO.on("go back")
def go_back():
    """
    function to handle go back
    """
    emit_all_items(FEED_UPDATE_CHANNEL, request.sid)


@SOCKETIO.on("post price history")
def post_price_history(data):
    """sends post information to database, updates posts, and
    sends updated list of posts to users"""
    print(data)
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M")
    data["time"] = dt_string
    price_list = data["priceHistory"]
    price_list_str = ""
    for entry in price_list:
        price_list_str += entry["price_date"] + " - " + str(entry["price"]) + " "
    the_post = models.Posts(
        data["user"],
        data["profpic"],
        dt_string,
        data["title"],
        data["imgurl"],
        price_list_str,
        0,  # INITIAL LIKES
        "TODO REMOVE GRAPHURL",  # GRAPHURL REMOVE LATER
        data["ASIN"],
        data["min"],
        data["max"],
        data["mean"],
        data["variance"],
        data["currprice"],
    )
    DB.session.add(the_post)
    DB.session.commit()
    print("This is the price history:", data["ASIN"], data["priceHistory"])
    # emit_all_items(FEED_UPDATE_CHANNEL)
    emit_latest_post()


@SOCKETIO.on("detail view request")
def get_post_details(data):
    """sends itemname to database, and fetches
    graph data, and math"""
    pricehistory = []
    asin = ""
    itemname = ""
    imgurl = ""
    mean = 0
    variance = 0
    min_price = 0
    max_price = 0
    username = ""
    pfp = ""
    likes = 0
    dataset = []
    datapts = []
    post_id = 0
    item_data = DB.session.query(models.Posts).filter_by(itemname=data["title"]).all()
    for item in item_data:
        pricehistory = item.pricehist
        asin = item.asin
        itemname = item.itemname
        imgurl = item.imageurl
        mean = item.meanprice
        variance = item.varianceprice
        min_price = item.minprice
        max_price = item.maxprice
        username = item.username
        pfp = item.pfp
        likes = item.likes
        dataset = re.findall(r"\d{2}\/\d{2}\/\d{4}", pricehistory)
        datapts = re.findall(r"\d{1,}\.\d{1,2}", pricehistory)
        post_id = item.id

    SOCKETIO.emit(
        "detail view response",
        {
            "pricehistory": pricehistory,
            "asin": asin,
            "itemname": itemname,
            "imgurl": imgurl,
            "mean": mean,
            "variance": variance,
            "min_price": min_price,
            "max_price": max_price,
            "username": username,
            "pfp": pfp,
            """need to remove graph url""" "graphurl": "TODO REMOVE",
            "likes": likes,
            "dataset": dataset,
            "datapts": datapts,
            "postID": post_id,
        },
        room=request.sid,
    )
    # Comments now loaded with post details
    emit_comments(post_id)
    emit_likes(post_id, username)


@SOCKETIO.on("post comment")
def post_comment(data):
    """Posts a given comment to the comments"""
    # Add comment to DB
    the_comment = models.Comment(
        data["post_id"], data["username"], data["pfp"], data["comment_text"]
    )
    DB.session.add(the_comment)
    DB.session.commit()
    # Update comments client-side
    emit_comments(data["post_id"])
    emit_likes(data["post_id"], data["username"])


def like_exists(post_id, like_user):
    """Returns true if a user already liked a post"""
    user_likes = (
        DB.session.query(models.Like)
        .filter_by(post_id=post_id)
        .filter_by(username=like_user)
        .all()
    )
    num_liked = len(user_likes)
    if num_liked > 0:
        return True
    else:
        return False


@SOCKETIO.on("Toggle_Like")
def toggle_like(data):
    """Toggles a like for a user, emits updated likecount/status"""
    # Like or unlike?
    print(data)
    post_id = data["postID"]
    like_user = data["username"]
    new_status = not data["status"]

    already_liked = like_exists(post_id, like_user)
    if new_status == True and not already_liked:
        # Add Like to DB
        new_like = models.Like(post_id, like_user)
        DB.session.add(new_like)
        DB.session.commit()
    elif new_status == False and already_liked:
        # Remove like from DB
        DB.session.query(models.Like).filter_by(username=like_user).filter_by(
            post_id=post_id
        ).delete()
        DB.session.commit()
    else:
        print("status/liked mismatch.")
    emit_likes(post_id, like_user, request.sid)


if __name__ == "__main__":
    # Don't test with these
    DB.create_all()
    DB.session.commit()
    SOCKETIO.run(
        APP,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", "8080")),
        debug=True,
    )
