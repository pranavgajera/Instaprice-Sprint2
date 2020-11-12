import unittest
from unittest.mock import patch
import sys
import os

sys.path.insert(1, os.getcwd())
import app
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
