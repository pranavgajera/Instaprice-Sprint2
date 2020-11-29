"""
Handles the database writes for app
"""
import os
import psycopg2
import re

SQL_USER = os.getenv("SQL_USER")
SQL_PWD = os.getenv("SQL_PASSWORD")
SQL_DB = os.getenv("SQL_DB")
DB_USER = os.getenv("USER")
DB_HOST = os.getenv("DB_HOST")
DATABASE_URI = os.getenv("DATABASE_URL")

CON = psycopg2.connect(database=SQL_DB, user=SQL_USER, password=SQL_PWD, host=DB_HOST)

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
        pfp = price_data['profpic']
        time = price_data['time']
        likes = 99
        graphurl ='./graphs/graph_Test ID.png'
        asin = price_data['ASIN']
        minprice = price_data['min']
        maxprice = price_data['max']
        meanprice = price_data['mean']
        varianceprice = price_data['variance']
        currprice = price_data['currprice']
        cur.execute("INSERT INTO posts (itemname, imageurl, pricehist, username, pfp, time, likes, graphurl, asin, minprice, maxprice, varianceprice, meanprice, currprice) " + \
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", (item, imageurl, price_list_str, poster, pfp, time, likes, graphurl, asin, minprice, maxprice, meanprice, varianceprice, currprice ))

def get_posts(username):
    """get posts from a specific user from the database"""
    with CON:
        cur = CON.cursor()
        cur.execute(f"SELECT * FROM posts WHERE username = '{username}'")
        rows = cur.fetchall()
        dataset = re.findall(r'\d{2}\/\d{2}\/\d{4}', rows[0][3])
        datapts = datapt = re.findall(r"\d{1,}\.\d{1,2}", rows[0][3])
        item_data = {
            'itemname': rows[0][1],
            'imgurl': rows[0][2],
            'pricehistory': rows[0][3],
            'user': rows[0][4],
            'pfp': rows[0][5],
            'time': rows[0][6],
            'likes': rows[0][7],
            'graphurl': rows[0][8],
            'asin': rows[0][9],
            'dataset': dataset,
            'datapts': datapts
            }
        return item_data
        
def get_item_data(itemdata):
    """get data on an item from the database"""
    escaped_itemdata = itemdata.replace("'","''")
    with CON:
        cur = CON.cursor()
        cur.execute(f"SELECT * FROM posts WHERE itemname = '{escaped_itemdata}'")
        rows = cur.fetchall()
        print(rows[0][3])
        item_data = {
            'itemname': rows[0][1],
            'imgurl': rows[0][2],
            'pricehistory': rows[0][3],
            'user': rows[0][4],
            'pfp': rows[0][5],
            'time': rows[0][6],
            'likes': rows[0][7],
            'graphurl': rows[0][8],
            'asin': rows[0][9],
            'minprice': rows[0][10],
            'maxprice': rows[0][11],
            'meanprice': rows[0][12],
            'varianceprice': rows[0][13]
            }
        return item_data
