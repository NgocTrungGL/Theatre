import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+pymysql://root:123456@localhost/cinema')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
