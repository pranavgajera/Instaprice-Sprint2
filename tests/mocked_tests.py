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
import pickle
import requests
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

            #self.assertEquals(KEY_EXPECTED, feteched_data)

    # Test api_calls
    def test_load_pickle(self):
        """Tests api_calls.load_pickle()"""
        search_resp = api_calls.load_pickle("search_results.pkl")
        price_history_resp = api_calls.load_pickle("price_history.pkl")
        self.assertEqual(type(search_resp), requests.models.Response)
        self.assertEqual(type(price_history_resp), requests.models.Response)
    
    def test_mock_search(self):
        """Tests api_calls.mock_search_response()"""
        
        search_results = api_calls.mock_search_response("Arbitrary Search Text")
        self.assertEqual(type(search_results), list)
        self.assertEqual(len(search_results), 10)
        
        first_result = search_results[0]
        self.assertEqual(type(first_result),dict)
        self.assertTrue("ASIN" in first_result)
        self.assertTrue("title" in first_result)
        self.assertTrue("price" in first_result)


    def test_mock_price_history(self):
        """Tests api_calls.mock_price_history()"""
        price_history = api_calls.mock_price_history("Aritrary ASIN")
        self.assertEqual(type(price_history), list)
        self.assertEqual(len(price_history), 333)
        
        first_entry = price_history[0]
        self.assertTrue("price" in first_entry)
        self.assertTrue("price_date" in first_entry)


    def test_search_amazon(self):
        """Tests api_calls.search_amazon()"""
        with patch('api_calls.requests.get') as mocked_request:
            # Patch pickled resp into get() return val
            pickled_mock_file = open("search_results.pkl",'rb')
            pickled_resp = pickle.load(pickled_mock_file)
            pickled_mock_file.close()
            mocked_request.return_value = pickled_resp
            
            # Test search_amazon()
            search_results = api_calls.search_amazon("Query Text")
            self.assertEqual(type(search_results), list)
            self.assertEqual(len(search_results), 10)
            
            first_result = search_results[0]
            self.assertEqual(type(first_result),dict)
            self.assertTrue("ASIN" in first_result)
            self.assertTrue("title" in first_result)
            self.assertTrue("price" in first_result)
            
            
        
    def test_fetchamazonprice(self):
        """
        Tests api_calls.fetch_price_history()
        Uses pickled response to mock HTTP response
        """

        with patch('api_calls.requests.get') as mocked_request:
            # Patch pickled resp into get() return val
            pickled_mock_file = open("price_history.pkl",'rb')
            pickled_resp = pickle.load(pickled_mock_file)
            pickled_mock_file.close()
            mocked_request.return_value = pickled_resp
            
            # Test fetch_price_history()
            price_history = api_calls.fetch_price_history("Arbitrary ASIN")
            #print("Price History: {}".format(price_history))
            first_entry = price_history[0]
            expected_entry = {'price':6.05,'price_date':'12/07/2019'}
            self.assertEqual(first_entry, expected_entry)
            self.assertEqual(type(price_history), list)
    
    def test_search_amazon_404(self):
        """Tests search_amazon during 404 response"""
        with patch('api_calls.requests.get') as mocked_request:
            # Patch pickled resp into get() return val
            resp_404 = requests.models.Response()
            resp_404.status_code = 404
            mocked_request.return_value = resp_404
            
            # Test fetch_price_history() with 404 reponse
            price_history = api_calls.search_amazon("Query to get error")
            self.assertEqual(type(price_history), str)
            self.assertTrue("There was an error with getting amazon search results." in price_history)
            self.assertNotEqual(type(price_history), list)
        
    def test_price_history_404(self):
        """Tests fetch_price_history during 404 response"""
        with patch('api_calls.requests.get') as mocked_request:
            # Patch pickled resp into get() return val
            resp_404 = requests.models.Response()
            resp_404.status_code = 404
            mocked_request.return_value = resp_404
            
            # Test fetch_price_history() with 404 reponse
            price_history = api_calls.fetch_price_history("B00KPVSZBA")
            self.assertEqual(type(price_history), str)
            self.assertTrue("There was an error with fetching price history." in price_history)
            self.assertNotEqual(type(price_history), list)
    


if __name__ == '__main__':
    unittest.main()