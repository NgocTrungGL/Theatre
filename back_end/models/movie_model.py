from flask_sqlalchemy import SQLAlchemy
from models.user_model import db

class Movie(db.Model):
    __tablename__ = 'movies'

    movie_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titleImg = db.Column(db.LargeBinary)
    bgImg = db.Column(db.LargeBinary)
    previewImg = db.Column(db.LargeBinary)
    video = db.Column(db.String(255))
    title = db.Column(db.String(100))
    year = db.Column(db.Integer)
    date = db.Column(db.String(50))
    ageLimit = db.Column(db.String(10))
    length = db.Column(db.String(50))
    category = db.Column(db.String(50))
    type = db.Column(db.Enum('coming', 'released'))
    description = db.Column(db.Text)
    active = db.Column(db.Boolean, default=False)
    