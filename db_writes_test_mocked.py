import unittest
from unittest.mock import patch
from db_writes import price_write, get_posts
from models import Posts

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
USER_INPUT = "username"

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
                    'time': '12:00'},
                USER_INPUT: 'john'
            }
        ]
    @patch("psycopg2.connect")
    def test_db_success(self, mock_connect):
        for test_case in self.success_test_params:
            price_write(test_case[KEY_INPUT])
            mock_con = mock_connect.return_value 
            mock_cur = mock_con.cursor.return_value 
            mock_cur = mock_con.cursor.return_value 
            feteched_data = get_posts(test_case[USER_INPUT])
            mock_con = mock_connect.return_value 
            mock_cur = mock_con.cursor.return_value 
            mock_cur = mock_con.cursor.return_value 
            mock_cur.fetchall.return_value = test_case[KEY_EXPECTED]
            self.assertEquals(test_case[KEY_EXPECTED], feteched_data)
        
if __name__ == '__main__':
    unittest.main()
