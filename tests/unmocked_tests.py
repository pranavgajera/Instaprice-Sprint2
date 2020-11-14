import unittest
from unittest.mock import patch
import sys
import os
import json
from os.path import join, dirname
sys.path.insert(1, os.getcwd())
import api_calls
from models import Posts
from db_writes import price_write, get_posts

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class DbWriteTestCase(unittest.TestCase):
    def setUp(self):
        
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'ASIN': 'B0897VCSXQ', 
                    'priceHistory': [{'price': 420.42, 'price_date': '08/04/2020'}], 
                    'title': 'PlayStation 6', 
                    'imgurl': 'playstation6.jpg', 
                    'user': 'john', 
                    'time': '12:00'},
                KEY_EXPECTED: {
                    'itemname': 'PlayStation 6', 
                    'imgurl': 'playstation6.jpg', 
                    'pricehistory': '08/04/2020 - 420.42 ', 
                    'user': 'john', 
                    'pfp': 'temp profile picture', 
                    'time': '12:00'}
            },
            {
                KEY_INPUT: {
                    'ASIN': '1111111', 
                    'priceHistory': [{'price': 4.20, 'price_date': '04/20/2021'}], 
                    'title': 'Socks that are red', 
                    'imgurl': 'redsocks.jpg', 
                    'user': 'steve', 
                    'time': '04:20'},
                KEY_EXPECTED: {
                    'itemname': 'Socks that are red', 
                    'imgurl': 'redsocks.jpg', 
                    'pricehistory': '04/20/2021 - 4.20 ', 
                    'user': 'steve', 
                    'pfp': 'temp profile picture', 
                    'time': '04:20'}
            },
        ]

    def test_db_success(self):
        for test_case in self.success_test_params:
            price_write(test_case[KEY_INPUT])
            postdata = get_posts(test_case[KEY_INPUT]['user'])
            expected = test_case[KEY_EXPECTED]
            
            self.assertEqual(postdata['itemname'], expected['itemname'])
            self.assertEqual(postdata['user'], expected['user'])

    def test_mock_search_response(self):
        test_result = api_calls.mock_search_response('query')
        # print(test_result)
        return_result = {
            'ASIN': 'B0897VCSXQ',
            'title': 'Aoozi Webcam with Microphone, Webcam 1080P USB Computer Web Camera with Facial-Enhancement Technology, Widescreen Video Calling and Recording, Streaming Camera with Tripod',
            'price': '$22.99',
            'listPrice': '', 'imageUrl': 'https://m.media-amazon.com/images/I/41jeAVPimNL._SL160_.jpg',
            'detailPageURL': 'https://www.amazon.com/dp/B0897VCSXQ',
            'rating': '4.1',
            'totalReviews': '1241',
            'subtitle': '',
            'isPrimeEligible': '1'
        }
        self.assertDictEqual(test_result[0], return_result)
        
    def test_mock_price_history(self):
        test_result = api_calls.mock_price_history('query')
        return_result = {
            'price': 6.05, 
            'price_date': '12/07/2019'
        }
        
        self.assertDictEqual(test_result[0], return_result)
        
if __name__ == '__main__':
    unittest.main()