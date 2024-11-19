# app.py
from flask import Flask
from controllers.user_controller import create_user, get_all_users, get_user, update_user, delete_user
from controllers.movie_controller import create_movie, get_all_movies, get_movie, update_movie, delete_movie
from models.user_model import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# Tạo database ban đầu
with app.app_context():
    db.create_all()
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

if __name__ == '__main__':
    app.run(debug=True)
