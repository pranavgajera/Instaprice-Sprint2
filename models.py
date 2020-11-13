"""table layout"""

# models.py
from app import DB

class Posts(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    itemname = DB.Column(DB.String(225))
    imageurl = DB.Column(DB.String(225))
    pricehist = DB.Column(DB.String(400))
    username = DB.Column(DB.String(225))
    pfp = DB.Column(DB.String(225))
    time = DB.Column(DB.String(225))

    def __init__(self, username, pfp, time, itemname, imageurl, pricehist):
        self.username = username
        self.pfp = pfp
        self.time = time
        self.itemname = itemname
        self.imageurl = imageurl
        self.pricehist = pricehist

    def __repr__(self):
        return "<Message by user %s with content: %s>" % (
            self.username,
            self.pricehist,
        )