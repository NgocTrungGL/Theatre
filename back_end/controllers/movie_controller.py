import base64
from flask import request, jsonify
from models.movie_model import db, Movie
import os


def create_movie():
    data = request.get_json()
    title_img_data = None
    bg_img_data = None
    preview_img_data = None
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # if 'titleImg' in data:
    #     with open(data['titleImg'], 'rb') as f:
    #         title_img_data = f.read()  # Read the title image as binary data
            
    # if 'bgImg' in data:
    #     with open(data['bgImg'], 'rb') as f:
    #         bg_img_data = f.read()  # Read the background image as binary data

    # if 'previewImg' in data:
    #     with open(data['previewImg'], 'rb') as f:
    #         preview_img_data = f.read()  # Read the preview image as binary data
    if 'titleImg' in data:
        # Xây dựng đường dẫn tuyệt đối cho titleImg
        title_img_path = os.path.join(base_dir, data['titleImg'])
        # Kiểm tra nếu file tồn tại và đọc nội dung
        if os.path.exists(title_img_path):
            with open(title_img_path, 'rb') as f:
                title_img_data = f.read()

    if 'bgImg' in data:
        # Xây dựng đường dẫn tuyệt đối cho bgImg
        bg_img_path = os.path.join(base_dir, data['bgImg'])
        # Kiểm tra nếu file tồn tại và đọc nội dung
        if os.path.exists(bg_img_path):
            with open(bg_img_path, 'rb') as f:
                bg_img_data = f.read()

    if 'previewImg' in data:
        # Xây dựng đường dẫn tuyệt đối cho previewImg
        preview_img_path = os.path.join(base_dir, data['previewImg'])
        # Kiểm tra nếu file tồn tại và đọc nội dung
        if os.path.exists(preview_img_path):
            with open(preview_img_path, 'rb') as f:
                preview_img_data = f.read()
    new_movie = Movie(
        titleImg=title_img_data,
        bgImg=bg_img_data,
        previewImg=preview_img_data,
        video=data['video'],
        title=data['title'],
        year=data['year'],  # Ensure this is an integer
        date=data['date'],
        ageLimit=data['ageLimit'],
        length=data['length'],
        category=data['category'],
        type=data['type'],
        description=data['description'],
        active=data.get('active', False)  # Default to False if not provided
    )

    db.session.add(new_movie)
    db.session.commit()
    return jsonify({'message': 'Movie created successfully'}), 201

# Get All Movies
def get_all_movies():
    movies = Movie.query.all()
    all_movies = []
    for movie in movies:
        movie_data = {
            'movie_id': movie.movie_id,
            'titleImg': base64.b64encode(movie.titleImg).decode('utf-8') if movie.titleImg else None,
            'bgImg': base64.b64encode(movie.bgImg).decode('utf-8') if movie.bgImg else None,
            'previewImg': base64.b64encode(movie.previewImg).decode('utf-8') if movie.previewImg else None,
            'video': movie.video,
            'title': movie.title,
            'year': movie.year,
            'date': movie.date,
            'ageLimit': movie.ageLimit,
            'length': movie.length,
            'category': movie.category,
            'type': movie.type,
            'description': movie.description,
            'active': movie.active
        }
        all_movies.append(movie_data)
    return jsonify(all_movies), 200

# Get Movie by ID
def get_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404

    movie_data = {
        'movie_id': movie.movie_id,
        'titleImg': base64.b64encode(movie.titleImg).decode('utf-8') if movie.titleImg else None,
        'bgImg': base64.b64encode(movie.bgImg).decode('utf-8') if movie.bgImg else None,
        'previewImg': base64.b64encode(movie.previewImg).decode('utf-8') if movie.previewImg else None,
        'video': movie.video,
        'title': movie.title,
        'year': movie.year,
        'date': movie.date,
        'ageLimit': movie.ageLimit,
        'length': movie.length,
        'category': movie.category,
        'type': movie.type,
        'description': movie.description,
        'active': movie.active
    }
    return jsonify(movie_data), 200

# Update Movie
def update_movie(movie_id):
    data = request.get_json()
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    
    movie.titleImg = data.get('titleImg', movie.titleImg)
    movie.bgImg = data.get('bgImg', movie.bgImg)
    movie.previewImg = data.get('previewImg', movie.previewImg)
    movie.video = data.get('video', movie.video)
    movie.title = data.get('title', movie.title)
    movie.year = data.get('year', movie.year)  # Assuming year is passed as integer
    movie.date = data.get('date', movie.date)
    movie.ageLimit = data.get('ageLimit', movie.ageLimit)
    movie.length = data.get('length', movie.length)
    movie.category = data.get('category', movie.category)
    movie.type = data.get('type', movie.type)
    movie.description = data.get('description', movie.description)
    movie.active = data.get
    
def delete_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    
    db.session.delete(movie)
    db.session.commit()
    return jsonify({'message': 'Movie deleted successfully'}), 200