# app.py
from flask import Flask
from controllers.user_controller import create_user, get_all_users, get_user, update_user, delete_user
from controllers.movie_controller import create_movie, get_all_movies, get_movie, update_movie, delete_movie
from models.user_model import db
from config import Config
from controllers.user_controller import user_blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)
# Tạo database ban đầu
with app.app_context():
    db.create_all()

app.config['JWT_SECRET_KEY'] = 'a3f5e6d7c8b9a0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5'
jwt = JWTManager(app)
@app.route('/')
def hello():
    return "<h1>Xin Chao Ban</h1>"
# Routes
@app.route('/user', methods=['POST'])
def create():
    return create_user()

@app.route('/users', methods=['GET'])
def get_all():
    return get_all_users()

@app.route('/user/<int:user_id>', methods=['GET'])
def get(user_id):
    return get_user(user_id)

@app.route('/user/<int:user_id>', methods=['PUT'])
def update(user_id):
    return update_user(user_id)

@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete(user_id):
    return delete_user(user_id)

#movie
@app.route('/movies', methods=['GET'])
def get_all_movies_route():
    return get_all_movies()

@app.route('/movies', methods=['POST'])
def create_m():
    return create_movie()

@app.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie_route(movie_id):
    return get_movie(movie_id)

@app.route('/movies/<int:movie_id>', methods=['PUT'])
def update_movie_route(movie_id):
    return update_movie(movie_id)

@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie_route(movie_id):
    return delete_movie(movie_id)

app.register_blueprint(user_blueprint, url_prefix='/api/users')


if __name__ == '__main__':
    app.run(debug=True)
# from flask import Flask
# from controllers.user_controller import create_user, get_all_users, get_user, update_user, delete_user
# from controllers.movie_controller import create_movie, get_all_movies, get_movie, update_movie, delete_movie
# from models.user_model import db
# from config import Config
# from controllers.user_controller import user_blueprint
# from flask_cors import CORS

# app = Flask(__name__)
# app.config.from_object(Config)
# db.init_app(app)
# CORS(app)

# # Tạo database ban đầu
# with app.app_context():
#     db.create_all()

# @app.route('/')
# def hello():
#     return "<h1>Xin Chao Ban</h1>"

# # Routes for Users
# @app.route('/user', methods=['POST'])
# def create_user_route():
#     return create_user()

# @app.route('/users', methods=['GET'])
# def get_all_users_route():
#     return get_all_users()

# @app.route('/user/<int:user_id>', methods=['GET'])
# def get_user_route(user_id):
#     return get_user(user_id)

# @app.route('/user/<int:user_id>', methods=['PUT'])
# def update_user_route(user_id):
#     return update_user(user_id)

# @app.route('/user/<int:user_id>', methods=['DELETE'])
# def delete_user_route(user_id):
#     return delete_user(user_id)

# # Routes for Movies
# @app.route('/movies', methods=['GET'])
# def get_all_movies_route():
#     return get_all_movies()

# @app.route('/movies', methods=['POST'])
# def create_movie_route():
#     return create_movie()

# @app.route('/movies/<int:movie_id>', methods=['GET'])
# def get_movie_route(movie_id):
#     return get_movie(movie_id)

# @app.route('/movies/<int:movie_id>', methods=['PUT'])
# def update_movie_route(movie_id):
#     return update_movie(movie_id)

# @app.route('/movies/<int:movie_id>', methods=['DELETE'])
# def delete_movie_route(movie_id):
#     return delete_movie(movie_id)

# app.register_blueprint(user_blueprint, url_prefix='/api/users')


# if __name__ == '__main__':
#     app.run(debug=True)
