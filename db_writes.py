"""
Handles the database writes for app
"""
import os
import dotenv
import psycopg2


SQL_USER = os.environ["SQL_USER"]
SQL_PWD = os.environ["SQL_PASSWORD"]
SQL_DB = os.environ["SQL_DB"]
DBUSER = os.environ["USER"]
DATABASE_URI = os.environ["DATABASE_URL"]

CON = psycopg2.connect(database=SQL_DB, user=SQL_USER, password=SQL_PWD, host="localhost")

def price_write(price_data):
    """write data to the database"""
    with CON:
        cur = CON.cursor()
        price_list = price_data['priceHistory']
        price_list_str = ''
        for entry in price_list:
            price_list_str += entry['price_date'] + ' - ' + str(entry['price']) + ' '
        item = price_data['title']
        imageurl = price_data['imgurl']
        poster = price_data['user']
        pfp = "temp profile picture"
        time = price_data['time']
        cur.execute("INSERT INTO posts (itemname, imageurl, pricehist, username, pfp, time) " + \
            "VALUES (%s, %s, %s, %s, %s, %s);", (item, imageurl, price_list_str, poster, pfp, time))

def get_posts(username):
    """get posts from a specific user from the database"""
    with CON:
        cur = CON.cursor()
        cur.execute(f"SELECT * FROM posts WHERE username = '{username}'")
        rows = cur.fetchall()
        item_data = {
            'itemname': rows[0][1],
            'imgurl': rows[0][2],
            'pricehistory': rows[0][3],
            'user': rows[0][4],
            'pfp': rows[0][5],
            'time': rows[0][6]
            }
        return item_data
