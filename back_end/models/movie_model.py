from flask_sqlalchemy import SQLAlchemy
from models.user_model import db

class Movie(db.Model):
    __tablename__ = 'movies'

    movie_id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Mã định danh tự động tăng
    titleImg = db.Column(db.LargeBinary)  # Đường dẫn ảnh tiêu đề
    bgImg = db.Column(db.LargeBinary)  # Đường dẫn ảnh nền
    previewImg = db.Column(db.LargeBinary)  # Đường dẫn ảnh xem trước
    trailer = db.Column(db.String(255))  # URL video (trailer)
    video = db.Column(db.String(255))  # URL video (phim)
    title = db.Column(db.String(100))  # Tiêu đề phim
    year = db.Column(db.Integer)  # Năm phát hành
    date = db.Column(db.String(50))  # Ngày phát hành
    ageLimit = db.Column(db.String(10))  # Giới hạn độ tuổi (15+, 18+...)
    length = db.Column(db.String(50))  # Thời lượng phim (vd: 2h 07min)
    category = db.Column(db.String(50))  # Thể loại phim (vd: Adventure, Action...)
    type = db.Column(db.Enum('coming', 'released'))  # Trạng thái phim (sắp ra mắt hoặc đã phát hành)
    description = db.Column(db.Text)  # Mô tả nội dung phim
    active = db.Column(db.Boolean, default=False)  # Trạng thái phim có đang hoạt động hay không
