from flask import Flask, render_template, request, jsonify
import pymysql

app = Flask(__name__)

# Kết nối tới cơ sở dữ liệu
db = pymysql.connect(
    host="localhost",
    user="root",
    password="123456",
    database="movie"
)

@app.route('/')
def index():
    return render_template('add_movie.html')

@app.route('/add_movie', methods=['POST'])
def add_movie():
    try:
        # Lấy dữ liệu từ form
        title_img = request.files['titleImg'].read()
        bg_img = request.files['bgImg'].read()
        preview_img = request.files['previewImg'].read()
        video = request.form['video']
        title = request.form['title']
        year = request.form['year']
        date = request.form['date']
        age_limit = request.form['ageLimit']
        length = request.form['length']
        category = request.form['category']
        movie_type = request.form['type']
        description = request.form['description']
        active = bool(int(request.form['active']))

        # Câu lệnh SQL để chèn dữ liệu
        query = """INSERT INTO Movies (titleImg, bgImg, previewImg, video, title, year, date, ageLimit, length, category, type, description, active)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (title_img, bg_img, preview_img, video, title, year, date, age_limit, length, category, movie_type, description, active)

        # Thực hiện câu lệnh SQL
        cursor = db.cursor()
        cursor.execute(query, values)
        db.commit()

        return jsonify({"message": "Movie added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
