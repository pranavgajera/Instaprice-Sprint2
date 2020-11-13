import unittest
from unittest.mock import patch
import sys
import os
import json
from os.path import join, dirname
sys.path.insert(1, os.getcwd())

import app
import api_calls
import db_writes

class TestBot(unittest.TestCase):
    def test_googleconnect(self):
        """Connection and disconnection test"""
        flask_test_client = app.app.test_client()
        socketio_test_clinet = app.socketio.test_client(
            app.app, flask_test_client=flask_test_client
        )
        socketio_test_clinet.emit("new google user", {
                'email': "pranavgajera@gmail.com",
                "name": "Pranav Gajera",
                "profilepicture": "https://miro.medium.com/max/500/1*zzo23Ils3C0ZDbvZakwXlg.png"
            })
        response = socketio_test_clinet.get_received()
        user = response[0]['args'][0]['username']
        self.assertEqual(user, "Pranav Gajera")
        response2 = socketio_test_clinet.disconnect()
        self.assertEqual(response2, None)

    def test_amazon_search(self):
        with patch('app.search_amazon') as mocked_return:
            mocked_return.return_value = {
                "ASIN": "B07X6C9RMF",
                "title": "Blink Mini \u2013 Compact indoor plug-in smart security camera, 1080 HD video, motion detection, night vision, Works with Alexa \u2013 1 camera",
                "price": "$34.99",
                "listPrice": "",
                "imageUrl": "https://m.media-amazon.com/images/I/31Ce3B42urL._SL160_.jpg",
                "detailPageURL": "https://www.amazon.com/dp/B07X6C9RMF",
                "rating": "4.5",
                "totalReviews": "30292",
                "subtitle": "",
                "isPrimeEligible": "1"

            }
            # print(json.dumps(mocked_return.return_value, indent=4))
            flask_test_client = app.app.test_client()
            socketio_test_client = app.socketio.test_client(
                app.app, flask_test_client=flask_test_client
            )
            socketio_test_client.emit(app.SEARCH_REQUEST_CHANNEL, {
                'query': 'mocked query'
            })
            socket_response = socketio_test_client.get_received()
            response = socket_response[0]['args'][0]['search_list']
            # print(response)
            self.assertEquals(response["ASIN"], "B07X6C9RMF")

    def test_amazon_price_search(self):
        with patch('app.fetch_price_history') as mocked_return:
            mocked_return.return_value = [
                {'price': 58.84, 'price_date': '06/09/2020'},
                {'price': 53.89, 'price_date': '06/18/2020'},
                {'price': 58.84, 'price_date': '07/08/2020'},
                {'price': 53.89, 'price_date': '07/15/2020'},
                {'price': 58.84, 'price_date': '08/19/2020'},
                {'price': 53.89, 'price_date': '08/25/2020'},
                {'price': 58.84, 'price_date': '10/26/2020'},
                {'price': 48.95, 'price_date': '11/07/2020'}
            ]
            flask_test_client = app.app.test_client()
            socketio_test_client = app.socketio.test_client(
                app.app, flask_test_client=flask_test_client
            )

            socketio_test_client.emit(app.PRICE_HISTORY_REQUEST_CHANNEL, {
                "ASIN": "B07X6C9RMF",
                "title": "Blink Mini \u2013 Compact indoor plug-in smart security camera, 1080 HD video, motion detection, night vision, Works with Alexa \u2013 1 camera",
                "imgurl": "https://m.media-amazon.com/images/I/31Ce3B42urL._SL160_.jpg",

            })

            socket_response = socketio_test_client.get_received()
            # print(socket_response)
            response = socket_response[0]['args'][0]['pricehistory'][0]

            self.assertEquals(response["price"], 58.84)

    def test_onnewitem(self):
        flask_test_client = app.app.test_client()
        socketio_test_client = app.socketio.test_client(
            app.app, flask_test_client=flask_test_client
        )

        socketio_test_client.emit("new item", {
            "item":"data"
        })
        socket_response = socketio_test_client.get_received()

    def test_home(self):
        flask_test_client = app.app.test_client()
        response = flask_test_client.get('/', content_type='html')
        self.assertEqual(response.status_code, 200)
        
    def test_db(self):
        with patch('psycopg2.connect') as mock_connect:
            KEY_INPUT = [{
                    'ASIN': 'B0897VCSXQ', 
                    'priceHistory': [{'price': 420.42, 'price_date': '08/04/2020'}], 
                    'title': 'PlayStation 6', 
                    'imgurl': 'playstation6.jpg', 
                    'user': 'john', 
                    'time': '12:00'}]
            KEY_EXPECTED = [{
                    'itemname': 'PlayStation 6', 
                    'imgurl': 'playstation6.jpg', 
                    'pricehistory': '08/04/2020 - 420.42 ', 
                    'user': 'john', 
                    'pfp': 'temp profile picture', 
                    'time': '12:00'}]
            USER_INPUT = 'john'
        
            price_write(KEY_INPUT)
            mock_con = mock_connect.return_value 
            mock_cur = mock_con.cursor.return_value 
            mock_cur = mock_con.cursor.return_value 
            feteched_data = get_posts(USER_INPUT)
            mock_con = mock_connect.return_value 
            mock_cur = mock_con.cursor.return_value 
            mock_cur = mock_con.cursor.return_value 
            mock_cur.fetchall.return_value = KEY_EXPECTED
            self.assertEquals(KEY_EXPECTED, feteched_data)
            
        