# models.py
import flask_sqlalchemy
from app import db

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemname = db.Column(db.String(225))
    imageurl = db.Column(db.String(225))
    pricehist = db.Column(db.String(400))
    username = db.Column(db.String(225))
    pfp = db.Column(db.String(225))
    time = db.Column(db.String(225))
