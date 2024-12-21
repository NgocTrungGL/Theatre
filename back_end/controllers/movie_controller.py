# import base64
# from flask import request, jsonify
# from models.movie_model import db, Movie
# import os

# import base64
# from flask import request, jsonify
# from models.movie_model import db, Movie
# from sqlalchemy.exc import SQLAlchemyError

# def create_movie():
#     data = request.get_json()
#     title_img_data = base64.b64decode(data['titleImg']) if data.get('titleImg') else None
#     bg_img_data = base64.b64decode(data['bgImg']) if data.get('bgImg') else None
#     preview_img_data = base64.b64decode(data['previewImg']) if data.get('previewImg') else None
    
#     new_movie = Movie(
#         titleImg=title_img_data,
#         bgImg=bg_img_data,
#         previewImg=preview_img_data,
#         trailer=data['trailer'],
#         video=data['video'],
#         title=data['title'],
#         year=data['year'],
#         date=data['date'],
#         ageLimit=data['ageLimit'],
#         length=data['length'],
#         category=data['category'],
#         type=data['type'],
#         description=data['description'],
#         active=data.get('active', False)
#     )

#     db.session.add(new_movie)
#     db.session.commit()
#     return jsonify({'message': 'Movie created successfully'}), 201

# # Get All Movies
# def get_all_movies():
#     movies = Movie.query.all()
#     all_movies = []
#     for movie in movies:
#         movie_data = {
#             'movie_id': movie.movie_id,
#             'titleImg': base64.b64encode(movie.titleImg).decode('utf-8') if movie.titleImg else None,
#             'bgImg': base64.b64encode(movie.bgImg).decode('utf-8') if movie.bgImg else None,
#             'previewImg': base64.b64encode(movie.previewImg).decode('utf-8') if movie.previewImg else None,
#             'trailer': movie.trailer,
#             'video': movie.video,
#             'title': movie.title,
#             'year': movie.year,
#             'date': movie.date,
#             'ageLimit': movie.ageLimit,
#             'length': movie.length,
#             'category': movie.category,
#             'type': movie.type,
#             'description': movie.description,
#             'active': movie.active
#         }
#         all_movies.append(movie_data)
#     return jsonify(all_movies), 200

# # Get Movie by ID
# def get_movie(movie_id):
#     movie = Movie.query.get(movie_id)
#     if not movie:
#         return jsonify({'message': 'Movie not found'}), 404

#     movie_data = {
#         'movie_id': movie.movie_id,
#         'titleImg': base64.b64encode(movie.titleImg).decode('utf-8') if movie.titleImg else None,
#         'bgImg': base64.b64encode(movie.bgImg).decode('utf-8') if movie.bgImg else None,
#         'previewImg': base64.b64encode(movie.previewImg).decode('utf-8') if movie.previewImg else None,
#         'trailer': movie.trailer,
#         'video': movie.video,
#         'title': movie.title,
#         'year': movie.year,
#         'date': movie.date,
#         'ageLimit': movie.ageLimit,
#         'length': movie.length,
#         'category': movie.category,
#         'type': movie.type,
#         'description': movie.description,
#         'active': movie.active
#     }
#     return jsonify(movie_data), 200

# # Update Movie
# def update_movie(movie_id):
#     data = request.get_json()

#     # Tìm kiếm movie trong database
#     movie = Movie.query.get(movie_id)
#     if not movie:
#         return jsonify({'message': 'Movie not found'}), 404

#     try:
#         # Encode base64 strings if they are not already encoded
#         if 'titleImg' in data:
#             movie.titleImg = base64.b64encode(data['titleImg'].encode()).decode()
#         if 'bgImg' in data:
#             movie.bgImg = base64.b64encode(data['bgImg'].encode()).decode()
#         if 'previewImg' in data:
#             movie.previewImg = base64.b64encode(data['previewImg'].encode()).decode()
        
#         # Update other fields
#         movie.trailer = data.get('trailer', movie.trailer)
#         movie.video = data.get('video', movie.video)
#         movie.title = data.get('title', movie.title)
#         movie.year = data.get('year', movie.year)
#         movie.date = data.get('date', movie.date)
#         movie.ageLimit = data.get('ageLimit', movie.ageLimit)
#         movie.length = data.get('length', movie.length)
#         movie.category = data.get('category', movie.category)
#         movie.type = data.get('type', movie.type)
#         movie.description = data.get('description', movie.description)
#         movie.active = data.get('active', movie.active)  # Đảm bảo cột 'active' được xử lý
        
#         # Lưu thay đổi vào database
#         db.session.commit()
#         return jsonify({'message': 'Movie updated successfully'}), 200
#     except SQLAlchemyError as e:
#         db.session.rollback()  # Rollback nếu có lỗi xảy ra
#         return jsonify({'message': f'Error updating movie: {str(e)}'}), 500
#     except Exception as e:
#         db.session.rollback()  # Rollback nếu có lỗi xảy ra
#         return jsonify({'message': f'Unexpected error: {str(e)}'}), 500
    
    
# def delete_movie(movie_id):
#     movie = Movie.query.get(movie_id)
#     if not movie:
#         return jsonify({'message': 'Movie not found'}), 404
    
#     db.session.delete(movie)
#     db.session.commit()
#     return jsonify({'message': 'Movie deleted successfully'}), 200
from flask import Flask, request, jsonify
from models.movie_model import db, Movie


# API to add a new movie
def create_movie():
    data = request.json
    try:
        movie = Movie(
            titleImg=data.get('titleImg'),
            bgImg=data.get('bgImg'),
            previewImg=data.get('previewImg'),
            trailer=data.get('trailer'),
            video=data.get('video'),
            title=data['title'],
            year=data.get('year'),
            date=data.get('date'),
            ageLimit=data.get('ageLimit'),
            length=data.get('length'),
            category=data.get('category'),
            type=data['type'],
            description=data.get('description'),
            active=data.get('active', False)
        )
        db.session.add(movie)
        db.session.commit()
        return jsonify({"message": "Movie added successfully!", "movie_id": movie.movie_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# API to get all movies

def get_all_movies():
    movies = Movie.query.all()
    result = []
    for movie in movies:
        result.append({
            "movie_id": movie.movie_id,
            "titleImg": movie.titleImg.decode('utf-8') if movie.titleImg else None,
            "bgImg": movie.bgImg.decode('utf-8') if movie.bgImg else None,
            "previewImg": movie.previewImg.decode('utf-8') if movie.previewImg else None,
            "trailer": movie.trailer,
            "video": movie.video,
            "title": movie.title,
            "year": movie.year,
            "date": movie.date,
            "ageLimit": movie.ageLimit,
            "length": movie.length,
            "category": movie.category,
            "type": movie.type,
            "description": movie.description,
            "active": movie.active
        })
    return jsonify(result), 200

# API to get a single movie by ID
def get_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    return jsonify({
        "movie_id": movie.movie_id,
        "titleImg": movie.titleImg.decode('utf-8') if movie.titleImg else None,
        "bgImg": movie.bgImg.decode('utf-8') if movie.bgImg else None,
        "previewImg": movie.previewImg.decode('utf-8') if movie.previewImg else None,
        "trailer": movie.trailer,
        "video": movie.video,
        "title": movie.title,
        "year": movie.year,
        "date": movie.date,
        "ageLimit": movie.ageLimit,
        "length": movie.length,
        "category": movie.category,
        "type": movie.type,
        "description": movie.description,
        "active": movie.active
    }), 200

# API to update a movie
def update_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    data = request.json
    try:
        movie.titleImg = data.get('titleImg', movie.titleImg)
        movie.bgImg = data.get('bgImg', movie.bgImg)
        movie.previewImg = data.get('previewImg', movie.previewImg)
        movie.trailer = data.get('trailer', movie.trailer)
        movie.video = data.get('video', movie.video)
        movie.title = data.get('title', movie.title)
        movie.year = data.get('year', movie.year)
        movie.date = data.get('date', movie.date)
        movie.ageLimit = data.get('ageLimit', movie.ageLimit)
        movie.length = data.get('length', movie.length)
        movie.category = data.get('category', movie.category)
        movie.type = data.get('type', movie.type)
        movie.description = data.get('description', movie.description)
        movie.active = data.get('active', movie.active)

        db.session.commit()
        return jsonify({"message": "Movie updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# API to delete a movie
def delete_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Movie deleted successfully!"}), 200
