# models.py
import flask_sqlalchemy
from app import db


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(225))
    email = db.Column(db.String(225))
    pfp = db.Column(db.String(225))
    likes = db.Column(db.Integer)
    profileURL = db.Column(db.String(225))
    queries = db.relationship('Queries', backref = 'user', lazy = True)
    comments = db.relationship('Comments', backref = 'user', lazy = True)
    
    def __init__(self, user, email, pfp, likes, profileURL):
        self.user = user
        self.email = email
        self.pfp = pfp
        self.likes = likes
        self.profileURL = profileURL

    def __repr__(self):
        return "<User: %s>" % self.user

class Queries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemID = db.Column(db.String(225))
    hist_low = db.Column(db.Integer)
    hist_high = db.Column(db.Integer)
    mean = db.Column(db.Integer)
    graphIMG = db.Column(db.String(225)) #URL to graph
    productURL = db.Column(db.String(225))
    
    def __init__(self, item_name, itemID, hist_low, hist_high, mean, graphIMG, productURL):
        self.item_name = item_name
        self.itemID =  itemID
        self.hist_low = hist_low
        self.hist_high = hist_high
        self.mean = mean
        self.graphIMG = graphIMG
        self.productURL = productURL
    
    def __repr__(self):
        return "<Item: %s>" % self.item_name

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(225))
    profileURL = db.Column(db.String(225))
    comment = db.Column(db.Text)
    recipient = db.relationship('Profile')
    
    def __init__(self, user, profileURL, comment, recipient):
        self.user = ''
        self.profileURL = ''
        self.comment = ''
        self.recipient = recipient
        
    def __repr__(self):
        return return "<User: %s>" % self.user
        
        
    