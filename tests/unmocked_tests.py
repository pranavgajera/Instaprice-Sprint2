import unittest
from unittest.mock import patch
import sys
import os
import json
from os.path import join, dirname
sys.path.insert(1, os.getcwd())
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
        
if __name__ == '__main__':
    unittest.main()
