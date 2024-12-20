# controllers/user_controller.py
from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.user_model import db, User

# Create User
def create_user():
    data = request.get_json()
    # hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Get All Users
def get_all_users():
    users = User.query.all()
    all_users = []
    for user in users:
        user_data = {
            'user_id': user.user_id,
            'username': user.username,
            'email': user.email,
            'registration_date': user.registration_date,
            'last_login': user.last_login
        }
        all_users.append(user_data)
    return jsonify(all_users), 200

# Get User by ID
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user_data = {
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'registration_date': user.registration_date,
        'last_login': user.last_login
    }
    return jsonify(user_data), 200

# Update User
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data and len(data['password']) > 8:
        user.password = generate_password_hash(data['password'], method='sha256')
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

# Delete User
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200
from flask import Blueprint, request, jsonify
from models.user_model import User

user_blueprint = Blueprint('user_blueprint', __name__)

# Đăng nhập
@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Lấy dữ liệu JSON từ request
    username = data.get('username')  # Lấy tên người dùng
    password = data.get('password')  # Lấy mật khẩu

    # Tìm người dùng trong cơ sở dữ liệu
    user = User.query.filter_by(username=username).first()

    if user and user.password == password:  # So sánh mật khẩu thô
        # Nếu mật khẩu đúng, trả về thông tin người dùng
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.user_id,
                "username": user.username
            }
        }), 200
    else:
        # Nếu không có người dùng hoặc mật khẩu sai
        return jsonify({"message": "Invalid credentials"}), 401
# from flask import request, jsonify
# from werkzeug.security import generate_password_hash
# from models.user_model import db, User

# # Create User
# def create_user():
#     data = request.get_json()
#     hashed_password = generate_password_hash(data['password'], method='sha256')
#     new_user = User(
#         username=data['username'],
#         email=data['email'],
#         password=hashed_password,
#         avatar=data.get('avatar')  # Lưu ảnh dưới dạng nhị phân từ request
#     )
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({'message': 'User created successfully'}), 201

# # Get All Users
# def get_all_users():
#     users = User.query.all()
#     all_users = []
#     for user in users:
#         user_data = {
#             'user_id': user.user_id,
#             'username': user.username,
#             'email': user.email,
#             'registration_date': user.registration_date,
#             'last_login': user.last_login,
#             'avatar': user.avatar  # Trả về dữ liệu ảnh từ cơ sở dữ liệu
#         }
#         all_users.append(user_data)
#     return jsonify(all_users), 200

# # Get User by ID
# def get_user(user_id):
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({'message': 'User not found'}), 404
#     user_data = {
#         'user_id': user.user_id,
#         'username': user.username,
#         'email': user.email,
#         'registration_date': user.registration_date,
#         'last_login': user.last_login,
#         'avatar': user.avatar  # Trả về dữ liệu ảnh từ cơ sở dữ liệu
#     }
#     return jsonify(user_data), 200

# # Update User
# def update_user(user_id):
#     data = request.get_json()
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({'message': 'User not found'}), 404
#     user.username = data.get('username', user.username)
#     user.email = data.get('email', user.email)
#     if 'password' in data and len(data['password']) > 8:
#         user.password = generate_password_hash(data['password'], method='sha256')
#     if 'avatar' in data:
#         user.avatar = data['avatar']  # Cập nhật ảnh từ request
#     db.session.commit()
#     return jsonify({'message': 'User updated successfully'}), 200

# # Delete User
# def delete_user(user_id):
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({'message': 'User not found'}), 404
#     db.session.delete(user)
#     db.session.commit()
#     return jsonify({'message': 'User deleted successfully'}), 200

# # Blueprint for User APIs
# from flask import Blueprint

# user_blueprint = Blueprint('user_blueprint', __name__)

# # Đăng nhập
# @user_blueprint.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()  # Lấy dữ liệu JSON từ request
#     username = data.get('username')  # Lấy tên người dùng
#     password = data.get('password')  # Lấy mật khẩu

#     # Tìm người dùng trong cơ sở dữ liệu
#     user = User.query.filter_by(username=username).first()

#     if user and generate_password_hash(password, method='sha256') == user.password:  # So sánh mật khẩu mã hóa
#         # Nếu mật khẩu đúng, trả về thông tin người dùng
#         return jsonify({
#             "message": "Login successful",
#             "user": {
#                 "id": user.user_id,
#                 "username": user.username,
#                 "avatar": user.avatar  # Trả về dữ liệu ảnh từ cơ sở dữ liệu
#             }
#         }), 200
#     else:
#         # Nếu không có người dùng hoặc mật khẩu sai
#         return jsonify({"message": "Invalid credentials"}), 401

# # API /me - Lấy thông tin người dùng hiện tại từ token
# @user_blueprint.route('/api/users/me', methods=['GET'])
# def get_current_user():
#     # Lấy thông tin từ token JWT
#     token = request.headers.get('Authorization', None)
#     if not token:
#         return jsonify({"message": "Missing token"}), 401
    
#     token = token.split(" ")[1]  # Lấy token từ header
#     user_identity = User.decode_jwt(token)  # Từ hàm decode_jwt của bạn để lấy thông tin người dùng từ token

#     if not user_identity:
#         return jsonify({"message": "Token is invalid"}), 401

#     user = User.query.get(user_identity['user_id'])
#     if not user:
#         return jsonify({"message": "User not found"}), 404
    
#     user_data = {
#         'user_id': user.user_id,
#         'username': user.username,
#         'email': user.email,
#         'registration_date': user.registration_date,
#         'last_login': user.last_login,
#         'avatar': user.avatar  # Trả về dữ liệu ảnh từ cơ sở dữ liệu
#     }
#     return jsonify(user_data), 200