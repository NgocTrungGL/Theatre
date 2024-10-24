CREATE DATABASE cinema;
USE cinema;

CREATE TABLE Movies (
	movie_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- Mã định danh tự động tăng
    titleImg BLOB, -- Đường dẫn ảnh tiêu đề
    bgImg BLOB, -- Đường dẫn ảnh nền
    previewImg BLOB, -- Đường dẫn ảnh xem trước
    video VARCHAR(255), -- URL video (trailer hoặc phim)
    title VARCHAR(100), -- Tiêu đề phim
    year YEAR, -- Năm phát hành
    date VARCHAR(50), -- Ngày phát hành
    ageLimit VARCHAR(10), -- Giới hạn độ tuổi (15+, 18+...)
    length VARCHAR(50), -- Thời lượng phim (vd: 2h 07min)
    genre_id VARCHAR(50), -- Thể loại phim (vd: Adventure, Action...)
    type ENUM('coming', 'released'), -- Trạng thái phim (sắp ra mắt hoặc đã phát hành)
    description TEXT, -- Mô tả nội dung phim
    active BOOLEAN DEFAULT FALSE -- Trạng thái phim có đang hoạt động hay không
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH(password) > 8), -- Mật khẩu mã hóa
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Bảng Watchlist (Danh sách phim yêu thích của người dùng)

CREATE TABLE Watchlist (
    watchlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Bảng Movie_Genres (Liên kết phim với thể loại)
CREATE TABLE Movie_Genres (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);