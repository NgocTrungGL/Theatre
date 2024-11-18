import os

class Config:
<<<<<<< HEAD
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+pymysql://root:123456@localhost/cinema')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
=======
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+pymysql://root:@localhost/cinema')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
>>>>>>> ef1408ce0bd4083ec8f8a4452fbf213eac36461c
