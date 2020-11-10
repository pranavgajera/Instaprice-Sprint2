"""
Handles the database writes for app
"""
import os
import pickle
import requests
import dotenv
import psycopg2
from api_calls import mock_price_history, mock_search_response


DOTENV_PATH = os.path.join(os.path.dirname(__file__), "secret_tokens.env")
dotenv.load_dotenv(DOTENV_PATH)

SQL_USER = os.environ["SQL_USER"]
SQL_PWD = os.environ["SQL_PASSWORD"]
DBUSER = os.environ["USER"]
DATABASE_URI = os.environ["DATABASE_URL"]
con = psycopg2.connect(database='postgres', user=SQL_USER, password=SQL_PWD)

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
  

def price_write(price_data):
    with con:
        cur = con.cursor()
        price_list = price_data['priceHistory']
        price_list_str = ''
        for entry in price_list:
            price_list_str += entry['price_date'] + ' ' + str(entry['price']) + ' '
        item = price_data['item_name']
        imageurl = price_data['img_url']
        poster = price_data['name']
        pfp = price_data['pfp']
        time = price_data['time']
        cur.execute("INSERT INTO posts (itemname, imageurl, pricehist, username, pfp, time) VALUES (%s, %s, %s, %s, %s, %s);", (item, imageurl, price_list_str, poster, pfp, time))
