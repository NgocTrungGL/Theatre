from flask_sqlalchemy import SQLAlchemy
from models.user_model import db

class Movie(db.Model):
    movie_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titleImg = db.Column(db.LargeBinary, nullable=True)
    bgImg = db.Column(db.LargeBinary, nullable=True)
    previewImg = db.Column(db.LargeBinary, nullable=True)
    trailer = db.Column(db.String(255), nullable=True)
    video = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=True)
    date = db.Column(db.String(50), nullable=True)
    ageLimit = db.Column(db.String(10), nullable=True)
    length = db.Column(db.String(50), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    type = db.Column(db.Enum('coming', 'released'), nullable=False)
    description = db.Column(db.Text, nullable=True)
    active = db.Column(db.Boolean, default=False, nullable=False)
    