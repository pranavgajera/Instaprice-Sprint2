# models.py
import flask_sqlalchemy
from app import db


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(225))
    email = db.Column(db.String(225))
    pfp = db.Column(db.String(225))
    likes = db.Column(db.Integer)
    profileurl = db.Column(db.String(225))
    queries = db.relationship('Queries', backref = 'name', lazy = True)
    comments = db.relationship('Comments', backref = 'name', lazy = True)
    
    def __init__(self, name, email, pfp, likes, profileurl):
        self.name = name
        self.email = email
        self.pfp = pfp
        self.likes = likes
        self.profileurl = profileurl

    def __repr__(self):
        return "<Name: %s>" % self.user

class Queries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemname = db.Column(db.String(225))
    itemID = db.Column(db.String(225))
    graphimg = db.Column(db.String(225)) #url to graph
    producturl = db.Column(db.String(225))
    pricehist = db.relationship('PriceHist', backref='queries', lazy = True)
    
    def __init__(self, itemname, itemid, graphimg, producturl):
        self.item_name = item_name
        self.itemid =  itemid
        self.graphimg = graphimg
        self.producturl = producturl
    
    def __repr__(self):
        return "<Item: %s>" % self.item_name
        
class PriceHist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemID = db.Column(db.String(225))
    date = db.Column(db.String(225))
    price = db.Column(db.Float)
    
    def __init__(self, itemname, itemid, graphimg, producturl):
        self.item_name = item_name
        self.itemid =  itemid
        self.graphimg = graphimg
        self.producturl = producturl
    
    def __repr__(self):
        return "<Item: %s>" % self.item_name

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(225))
    profileurl = db.Column(db.String(225))
    comment = db.Column(db.Text)
    recipient = db.relationship('profile')
    
    def __init__(self, user, profileurl, comment, recipient):
        self.user = ''
        self.profileurl = ''
        self.comment = ''
        self.recipient = recipient
        
    def __repr__(self):
        return "<User: %s>" % self.user
        
        
    