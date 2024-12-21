import React, { useState } from "react";
import "./admin.css";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("admin");
    const [movieId, setMovieId] = useState('');
    const [message, setMessage] = useState('');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleLogout = () => {
        // Logic for logging out the user
        alert('Logged out successfully');
    };

    // 
    const handleUpdateMovie = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(document.getElementById('update-movie-form'));
    
        const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = (error) => reject(error);
            });
        };
    
        try {
            const movieId = formData.get('movieId'); // Lấy ID phim cần cập nhật
            const titleImg = formData.get('titleImg');
            const bgImg = formData.get('bgImg');
            const previewImg = formData.get('previewImg');
    
            const data = {
                title: formData.get('title'),
                video: formData.get('video'),
                year: formData.get('year'),
                date: formData.get('release-date'),
                ageLimit: formData.get('age-limit'),
                length: formData.get('length'),
                category: formData.get('category'),
                description: formData.get('description'),
                type: formData.get('status'),
                titleImg: titleImg ? await getBase64(titleImg) : null,
                bgImg: bgImg ? await getBase64(bgImg) : null,
                previewImg: previewImg ? await getBase64(previewImg) : null,
            };
    
            const response = await fetch(`http://localhost:5000/movies/${movieId}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                alert('Phim đã được cập nhật thành công!');
            } else {
                const result = await response.json();
                alert(result.message || 'Cập nhật phim thất bại!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi cập nhật phim: ' + error.message);
        }
    };
    
    // 
function handleDeleteUser(event) {
    event.preventDefault();
    const userId = event.target.user_id.value;

    fetch(`http://127.0.0.1:5000/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Người dùng đã được xóa');
        } else {
            alert(data.message || 'Xóa người dùng thất bại');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi xóa người dùng: ' + error.message);
    });
}

//

function handleUpdateUser(event) {
    event.preventDefault();
    const userId = event.target.user_id.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    fetch(`http://127.0.0.1:5000/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'User updated successfully') {
            alert('Người dùng đã được cập nhật');
        } else {
            alert(data.message || 'Cập nhật người dùng thất bại');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi cập nhật người dùng: ' + error.message);
    });
}

// 

const handleAddMovie = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById('add-movie-form'));

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const titleImg = formData.get('titleImg');
    const bgImg = formData.get('bgImg');
    const previewImg = formData.get('previewImg');

    const data = {
        title: formData.get('title'),
        video: formData.get('video'),
        year: formData.get('year'),
        date: formData.get('release-date'),
        ageLimit: formData.get('age-limit'),
        length: formData.get('length'),
        category: formData.get('category'),
        description: formData.get('description'),
        type: formData.get('status'),
        titleImg: titleImg ? await getBase64(titleImg) : null,
        bgImg: bgImg ? await getBase64(bgImg) : null,
        previewImg: previewImg ? await getBase64(previewImg) : null,
    };

    console.log('Form Data:', data); // Log the form data to check if images are converted correctly

    try {
        const response = await fetch('http://localhost:5000/movies', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setMessage('Movie added successfully!');
        } else {
            setMessage('Failed to add movie.');
        }
    } catch (error) {
        console.error('Error:', error);
        setMessage('Error occurred while adding the movie.');
    }
};

    const handleDeleteMovie = async () => {
        const parsedMovieId = parseInt(movieId, 10);
        
        if (isNaN(parsedMovieId)) {
            alert('Invalid Movie ID');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/movies/${parsedMovieId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
    
            if (response.ok) {
                alert('Movie deleted successfully');
            } else {
                alert(data.message || 'Failed to delete movie');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="navbar">
            <button className="logout-button" onClick={handleLogout}>Đăng Xuất</button>
                <div className="nav-left">
                    <button onClick={() => handleSectionChange("admin")}>Quản Lý Phim</button>
                    <button onClick={() => handleSectionChange("users")}>Quản Lý Người Dùng</button>
                </div>
            </div>

            <div className="container">
                {activeSection === "admin" && (
                    <section id="admin" className="admin-section">
                        <h1>Quản Lý Phim</h1>

                        <section className="form-section">
                            <h2>Thêm Phim</h2>
                            <form onSubmit={handleAddMovie} id="add-movie-form">
                                <div className="input-group">
                                    <label htmlFor="title">Tiêu Đề Phim</label>
                                    <input type="text" id="title" name="title" placeholder="Tiêu Đề Phim" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="titleImg">Ảnh Tiêu Đề</label>
                                    <input type="file" id="titleImg" name="titleImg" accept="image/*" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="bgImg">Ảnh Nền</label>
                                    <input type="file" id="bgImg" name="bgImg" accept="image/*" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="previewImg">Ảnh Xem Trước</label>
                                    <input type="file" id="previewImg" name="previewImg" accept="image/*" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="video">URL Video</label>
                                    <input type="text" id="video" name="video" placeholder="URL Video" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="year">Năm Phát Hành</label>
                                    <input type="number" id="year" name="year" placeholder="Năm Phát Hành" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="release-date">Ngày Phát Hành</label>
                                    <input type="text" id="release-date" name="release-date" placeholder="Ngày Phát Hành" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="age-limit">Giới Hạn Độ Tuổi</label>
                                    <input type="text" id="age-limit" name="age-limit" placeholder="Giới Hạn Độ Tuổi" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="length">Thời Lượng Phim</label>
                                    <input type="text" id="length" name="length" placeholder="Thời Lượng Phim" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="category">Thể Loại Phim</label>
                                    <input type="text" id="category" name="category" placeholder="Thể Loại Phim" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="description">Mô Tả Phim</label>
                                    <textarea id="description" name="description" placeholder="Mô Tả Phim" required></textarea>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="status">Trạng Thái</label>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                                    <select id="status" name="status" required>
                                        <option value="coming">Coming</option>
                                        <option value="released">Released</option>
                                    </select>
                                </div>
                                <button type="submit">Thêm Phim</button>
                            </form>

                            <form onSubmit={handleUpdateMovie} id="update-movie-form">
                                <div className="input-group">
                                    <label htmlFor="movieId">ID Phim</label>
                                    <input type="number" id="movieId" name="movieId" placeholder="ID Phim" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="title">Tiêu Đề Phim</label>
                                    <input type="text" id="title" name="title" placeholder="Tiêu Đề Phim" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="titleImg">Ảnh Tiêu Đề</label>
                                    <input type="file" id="titleImg" name="titleImg" accept="image/*" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="bgImg">Ảnh Nền</label>
                                    <input type="file" id="bgImg" name="bgImg" accept="image/*" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="previewImg">Ảnh Xem Trước</label>
                                    <input type="file" id="previewImg" name="previewImg" accept="image/*" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="video">URL Video</label>
                                    <input type="text" id="video" name="video" placeholder="URL Video" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="status">Trạng Thái</label>
                                    <select id="status" name="status">
                                        <option value="coming">Coming</option>
                                        <option value="released">Released</option>
                                    </select>
                                </div>
                                <button type="submit">Cập Nhật Phim</button>
                            </form>
                        </section>

                        <section className="delete-section">
                            <h2>Xóa Phim</h2>
                            <div className="input-group">
                                <label htmlFor="delete-movie-title">ID Phim</label>
                                <input
                                    type="text"
                                    id="delete-movie-title"
                                    placeholder="ID Phim"
                                    value={movieId}
                                    onChange={(e) => setMovieId(e.target.value)}
                                />
                            </div>
                            <button onClick={handleDeleteMovie}>Xóa Phim</button>
                            {message && <p>{message}</p>}
                        </section>
                    </section>
                )}

                {activeSection === "users" && (
                    <section id="users" className="admin-section">
                        <h1>Quản Lý Người Dùng</h1>
                        {/* Thêm phần quản lý người dùng */}
                        <div>
                            <h2>Danh sách người dùng</h2>
                            {/* Hiển thị danh sách người dùng */}
                        </div>
                        <div>
                            <h2>Xóa người dùng</h2>
                            <form onSubmit={handleDeleteUser}>
                                <label>
                                    ID người dùng:
                                    <input type="number" name="user_id" required />
                                </label>
                                <button type="submit">Xóa</button>
                            </form>
                        </div>
                        <div>
                            <h2>Cập nhật người dùng</h2>
                            <form onSubmit={handleUpdateUser}>
                                <label>
                                    ID người dùng:
                                    <input type="number" name="user_id" required />
                                </label>
                                <label>
                                    Tên người dùng:
                                    <input type="text" name="username" required />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" required />
                                </label>
                                <label>
                                    Mật khẩu:
                                    <input type="password" name="password" required />
                                </label>
                                <button type="submit">Cập nhật</button>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;