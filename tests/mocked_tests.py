import unittest
from unittest.mock import patch
import sys
import os
import json
from os.path import join, dirname

# sys.path.insert(1, os.getcwd())
sys.path.insert(1, join(dirname(__file__), '../'))
import app
import api_calls
from db_writes import price_write, get_posts


class TestBot(unittest.TestCase):
    def test_googleconnect(self):
        """Connection and disconnection test"""
        flask_test_client = app.APP.test_client()
        socketio_test_clinet = app.SOCKETIO.test_client(
            app.APP, flask_test_client=flask_test_client
        )
        socketio_test_clinet.emit("new user", {
            'email': "pranavgajera@gmail.com",
            "name": "Pranav Gajera",
            "profilepicture": "https://miro.medium.com/max/500/1*zzo23Ils3C0ZDbvZakwXlg.png"
        })
        response = socketio_test_clinet.get_received()
        # print(json.dumps(response, indent=4))
        user = response[0]['args'][0]['username']
        self.assertEqual(user, "Pranav Gajera")
        response2 = socketio_test_clinet.disconnect()
        self.assertEqual(response2, None)

    def test_amazon_search_socket(self):
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
            flask_test_client = app.APP.test_client()
            socketio_test_client = app.SOCKETIO.test_client(
                app.APP, flask_test_client=flask_test_client
            )
            socketio_test_client.emit(app.SEARCH_REQUEST_CHANNEL, {
                'query': 'mocked query'
            })
            socket_response = socketio_test_client.get_received()
            response = socket_response[0]['args'][0]['search_list']
            # print(json.dumps(response, indent=4))
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
            flask_test_client = app.APP.test_client()
            socketio_test_client = app.SOCKETIO.test_client(
                app.APP, flask_test_client=flask_test_client
            )

            socketio_test_client.emit(app.PRICE_HISTORY_REQUEST_CHANNEL, {
                "ASIN": "B07X6C9RMF",
                "title": "Blink Mini \u2013 Compact indoor plug-in smart security camera, 1080 HD video, motion detection, night vision, Works with Alexa \u2013 1 camera",
                "imgurl": "https://m.media-amazon.com/images/I/31Ce3B42urL._SL160_.jpg",
                "username": "random",
                'pfp': "pfp"
            })

            socket_response = socketio_test_client.get_received()
            print(json.dumps(socket_response, indent=4))
            response = socket_response[0]['args'][0]['pricehistory'][0]

            self.assertEquals(response["price"], 58.84)

    def test_onnewitem(self):
        flask_test_client = app.APP.test_client()
        socketio_test_client = app.SOCKETIO.test_client(
            app.APP, flask_test_client=flask_test_client
        )

        socketio_test_client.emit("new item", {
            "item": "data"
        })
        socket_response = socketio_test_client.get_received()

    def test_home(self):
        flask_test_client = app.APP.test_client()
        response = flask_test_client.get('/', content_type='html')
        self.assertEqual(response.status_code, 200)

    def test_db(self):
        with patch('psycopg2.connect') as mock_connect:
            KEY_INPUT = {
                'ASIN': 'B0897VCSXQ',
                'priceHistory': [{'price': 420.42, 'price_date': '08/04/2020'}],
                'title': 'PlayStation 6',
                'imgurl': 'playstation6.jpg',
                'user': 'john',
                'time': '12:00',
                'profpic': 'temp profile picture',
                "min":0,
                "max":0,
                "mean":0,
                "variance":0,
                "currprice":0
            }
            KEY_EXPECTED = {
                'itemname': 'PlayStation 6',
                'imgurl': 'playstation6.jpg',
                'pricehistory': '08/04/2020 - 420.42 ',
                'user': 'john',
                'pfp': 'temp profile picture',
                'time': '12:00',
                'likes': 99,
                'graphurl': './graphs/graph_Test ID.png',
                'asin': 'B0897VCSXQ'

            }
            USER_INPUT = 'john'

            price_write(KEY_INPUT)
            feteched_data = get_posts(USER_INPUT)

            mock_con = mock_connect.return_value
            mock_cur = mock_con.cursor.return_value
            mock_cur.fetchall.return_value = KEY_EXPECTED

            self.assertEquals(KEY_EXPECTED, feteched_data)

    def test_amazon_search(self):
        with patch('api_calls.requests.get') as mocked_return:
            return_value = api_calls.mock_search_response('query')
            mocked_return.return_value = return_value[0]

            flask_test_client = app.APP.test_client()
            socketio_test_client = app.SOCKETIO.test_client(
                app.APP, flask_test_client=flask_test_client
            )

            socketio_test_client.emit(app.SEARCH_REQUEST_CHANNEL, {
                'query': ''
            })
            return_value= {
                    "ASIN": "B0897VCSXQ",
                    "title": "Aoozi Webcam with Microphone, Webcam 1080P USB Computer Web Camera with Facial-Enhancement Technology, Widescreen Video Calling and Recording, Streaming Camera with Tripod",
                    "price": "$22.99",
                    "listPrice": "",
                    "imageUrl": "https://m.media-amazon.com/images/I/41jeAVPimNL._SL160_.jpg",
                    "detailPageURL": "https://www.amazon.com/dp/B0897VCSXQ",
                    "rating": "4.1",
                    "totalReviews": "1241",
                    "subtitle": "",
                    "isPrimeEligible": "1"
                }
            socket_response = socketio_test_client.get_received()
            response = socket_response[0]['args'][0]['search_list']
            self.assertEquals(return_value, response[0])

    def test_fetchamazonprice(self):
        with patch('api_calls.fetch_price_history') as mocked_return:
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
            flask_test_client = app.APP.test_client()
            socketio_test_client = app.SOCKETIO.test_client(
                app.APP, flask_test_client=flask_test_client
            )

            socketio_test_client.emit(app.PRICE_HISTORY_REQUEST_CHANNEL, {
                "ASIN": "B07X6C9RMF",
                "title": "Blink Mini \u2013 Compact indoor plug-in smart security camera, 1080 HD video, motion detection, night vision, Works with Alexa \u2013 1 camera",
                "imgurl": "https://m.media-amazon.com/images/I/31Ce3B42urL._SL160_.jpg",
                "username": "random",
                'pfp': "pfp"

            })

            socket_response = socketio_test_client.get_received()
            response = socket_response[0]['args'][0]['pricehistory'][0]
            # print(json.dumps(response, indent=4))

            self.assertEquals(response["price"], 58.84)


if __name__ == '__main__':
    unittest.main()