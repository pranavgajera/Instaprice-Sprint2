"""table layout"""

# models.py
from app import DB

class Posts(DB.Model):
    """columns for post table"""
    id = DB.Column(DB.Integer, primary_key=True)
    itemname = DB.Column(DB.String(225))
    imageurl = DB.Column(DB.String(225))
    pricehist = DB.Column(DB.String(400))
    username = DB.Column(DB.String(225))
    pfp = DB.Column(DB.String(225))
    time = DB.Column(DB.String(225))
    likes = DB.Column(DB.Integer)
    graphurl = DB.Column(DB.String(225))
    asin = DB.Column(DB.String(225))
    minprice = DB.Column(DB.Integer)
    maxprice = DB.Column(DB.Integer)
    varianceprice = DB.Column(DB.Integer)
    meanprice = DB.Column(DB.Integer)
    currprice = DB.Column(DB.String(225))

    def __init__(self, username, pfp, time, itemname, imageurl, pricehist, likes,
                 graphurl, asin, minprice, maxprice, meanprice, varianceprice, currprice):
        self.username = username
        self.pfp = pfp
        self.time = time
        self.itemname = itemname
        self.imageurl = imageurl
        self.pricehist = pricehist
        self.likes = likes
        self.graphurl = graphurl
        self.asin = asin
        self.minprice = minprice
        self.maxprice = maxprice
        self.meanprice = meanprice
        self.varianceprice = varianceprice
        self.currprice = currprice
class Comment(DB.Model):
    """Table for comments"""
    comment_id = DB.Column(DB.Integer, primary_key=True)
    post_id = DB.Column(DB.Integer)
    username = DB.Column(DB.String(225))
    pfp = DB.Column(DB.String(225))
    comment_text = DB.Column(DB.String(600))

    def __init__(self, post_id, username, pfp, comment_text):
        """Constructor for writing to table"""
        self.post_id = post_id
        self.username = username
        self.pfp = pfp
        self.comment_text = comment_text

class Like(DB.Model):
    """Table for Likes"""
    like_id = DB.Column(DB.Integer, primary_key=True)
    post_id = DB.Column(DB.Integer)
    username = DB.Column(DB.String(225))
    def __init__(self, post_id, username):
        """Constructor for adding Like to table"""
        self.post_id = post_id
        self.username = username
