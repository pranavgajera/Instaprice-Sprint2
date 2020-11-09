"""
Handles the database writes for app
"""
import os
import pickle
import requests
import dotenv
import psycopg2
from api_calls import mock_price_history

# Source the env file automatically
DOTENV_PATH = os.path.join(os.path.dirname(__file__), "secret_tokens.env")
dotenv.load_dotenv(DOTENV_PATH)

SQL_USER = os.environ["SQL_USER"]
SQL_PWD = os.environ["SQL_PASSWORD"]
DBUSER = os.environ["USER"]
DATABASE_URI = os.environ["DATABASE_URL"]
con = psycopg2.connect(database='postgres', user=SQL_USER, password=SQL_PWD)
        
def user_write(login_data):
    with con:
        cur = con.cursor()
        cur.execute(f"INSERT INTO profile(name, email, pfp, likes, profileurl) VALUES('{login_data['name']}', '{login_data['email']}', '{login_data['profilepicture']}', 0, 'fdafadfad.com')")

def price_write(price_data):
    with con:
        cur = con.cursor()
        price_list = mock_price_history(price_data['ASIN'])
        size = len(price_list)
        cur.execute(f"DROP TABLE IF EXISTS {price_data['ASIN']}")
        cur.execute(f"CREATE TABLE {price_data['ASIN']}(date VARCHAR(255) PRIMARY KEY, price FLOAT)")
        for i in range(0, size):
            cur.execute(f"INSERT INTO {price_data['ASIN']}(date, price) VALUES('{price_list[i]['price_date']}', '{price_list[i]['price']}')")
        