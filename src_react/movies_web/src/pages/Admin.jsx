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
    
    const handleUpdateMovie = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(document.getElementById('update-movie-form'));
    
        const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]); // Chỉ lấy phần Base64
                reader.onerror = (error) => reject(error);
            });
        };
    
        try {
            const movieId = formData.get('movieId'); // Lấy ID phim cần cập nhật
            const titleImg = formData.get('titleImg'); // Lấy file ảnh tiêu đề
            const bgImg = formData.get('bgImg'); // Lấy file ảnh nền
            const previewImg = formData.get('previewImg'); // Lấy file ảnh xem trước
    
            const data = {
                title: formData.get('title'),
                video: formData.get('video'),
                year: formData.get('year'),
                date: formData.get('date'), // Đã sửa lại để khớp tên trường
                ageLimit: formData.get('ageLimit'), // Sửa đúng tên trường ageLimit
                length: formData.get('length'),
                category: formData.get('category'),
                description: formData.get('description'),
                type: formData.get('status'),
                active: formData.get('active') === 'on', // Checkbox được gửi như 'on' khi được chọn
                titleImg: titleImg ? await getBase64(titleImg) : null, // Chuyển ảnh tiêu đề sang Base64
                bgImg: bgImg ? await getBase64(bgImg) : null, // Chuyển ảnh nền sang Base64
                previewImg: previewImg ? await getBase64(previewImg) : null, // Chuyển ảnh xem trước sang Base64
            };
    
            console.log('Form Data:', data);
    
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
                    <button onClick={() => handleSectionChange("movies")}>Quản lý Phim</button>
                    <button onClick={() => handleSectionChange("users")}>Quản lý Người dùng</button>
                </div>
            </div>

            <div className="content">
                {activeSection === "movies" && (
                    <div>
                        <h2>Quản lý Phim</h2>
                        {/* Add forms and logic for movie management here */}
                    </div>
                )}
                {activeSection === "users" && (
                    <div>
                        <h2>Quản lý Người dùng</h2>
                        {/* Add forms and logic for user management here */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
