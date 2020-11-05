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
    #TODO
    
    def __init__(self):
        #TODO

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
        
        
    