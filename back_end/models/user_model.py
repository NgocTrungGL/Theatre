# models/user_model.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)  # Mật khẩu mã hóa
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

def set_password(self, password):
        self.password = password

    # Kiểm tra mật khẩu (không mã hóa)
def check_password(self, password):
    return self.password == password

@staticmethod
def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:  # So sánh mật khẩu
        return {'id': user.user_id, 'username': user.username}
    return None