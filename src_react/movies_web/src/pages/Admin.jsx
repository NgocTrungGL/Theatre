import React, { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("movies");
    const [movieId, setMovieId] = useState("");
    const [message, setMessage] = useState("");
    const [movieData, setMovieData] = useState({}); // Lưu dữ liệu phim để load lên form
    const navigate = useNavigate();

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleLogout = () => {
        navigate("/");
        alert("Logged out successfully");
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const loadMovieDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/movies/${id}`);
            if (response.ok) {
                const data = await response.json();
                setMovieData(data); // Lưu dữ liệu vào state để hiển thị
            } else {
                alert("Không tìm thấy phim!");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleUpdateMovie = async (event) => {
        event.preventDefault();
        const formData = new FormData(
            document.getElementById("update-movie-form")
        );

        const data = {
            title: formData.get("title"),
            trailer: formData.get("trailer"),
            video: formData.get("video"),
            year: formData.get("year"),
            date: formData.get("release-date"),
            ageLimit: formData.get("age-limit"),
            length: formData.get("length"),
            category: formData.get("category"),
            description: formData.get("description"),
            titleImg: formData.get("titleImg")
                ? await getBase64(formData.get("titleImg"))
                : null,
            bgImg: formData.get("bgImg")
                ? await getBase64(formData.get("bgImg"))
                : null,
            previewImg: formData.get("previewImg")
                ? await getBase64(formData.get("previewImg"))
                : null,
        };

        try {
            const response = await fetch(
                `http://localhost:5000/movies/${movieId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.ok) {
                alert("Movie updated successfully!");
            } else {
                alert("Failed to update movie.");
            }
        } catch (error) {
            alert("Error occurred while updating the movie.");
        }
    };

    const handleAddMovie = async (event) => {
        event.preventDefault();
        const formData = new FormData(
            document.getElementById("add-movie-form")
        );

        const data = {
            title: formData.get("title"),
            trailer: formData.get("trailer"),
            video: formData.get("video"),
            year: formData.get("year"),
            date: formData.get("release-date"),
            ageLimit: formData.get("age-limit"),
            length: formData.get("length"),
            category: formData.get("category"),
            description: formData.get("description"),
            titleImg: formData.get("titleImg")
                ? await getBase64(formData.get("titleImg"))
                : null,
            bgImg: formData.get("bgImg")
                ? await getBase64(formData.get("bgImg"))
                : null,
            previewImg: formData.get("previewImg")
                ? await getBase64(formData.get("previewImg"))
                : null,
        };

        try {
            const response = await fetch("http://localhost:5000/movies", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                setMessage("Movie added successfully!");
            } else {
                setMessage("Failed to add movie.");
            }
        } catch (error) {
            setMessage("Error occurred while adding the movie.");
        }
    };

    const handleDeleteMovie = async () => {
        if (!movieId) {
            alert("Vui lòng nhập Movie ID để xóa!");
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:5000/movies/${movieId}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                alert("Movie deleted successfully");
            } else {
                alert("Failed to delete movie");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    function handleDeleteUser(event) {
        event.preventDefault();
        const userId = event.target.user_id.value;

        fetch(`http://127.0.0.1:5000/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Người dùng đã được xóa");
                } else {
                    alert(data.message || "Xóa người dùng thất bại");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Đã xảy ra lỗi khi xóa người dùng: " + error.message);
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
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === "User updated successfully") {
                    alert("Người dùng đã được cập nhật");
                } else {
                    alert(data.message || "Cập nhật người dùng thất bại");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(
                    "Đã xảy ra lỗi khi cập nhật người dùng: " + error.message
                );
            });
    }

    return (
        <div
            className="admin-dashboard"
            style={{ backgroundImage: "url('/images/background.jpg')" }}
        >
            <div className="navbar">
                <button className="logout-button" onClick={handleLogout}>
                    Đăng Xuất
                </button>
                <div className="nav-left">
                    <button onClick={() => handleSectionChange("movies")}>
                        Quản lý Phim
                    </button>
                    <button onClick={() => handleSectionChange("users")}>
                        Quản lý Người dùng
                    </button>
                </div>
            </div>

            <div className="content1">
                {activeSection === "movies" && (
                    <div className="movie-section">
                        <h2>Quản lý Phim</h2>

                        {/* Cập nhật phim */}
                        <form
                            id="update-movie-form"
                            className="movie-form"
                            onSubmit={handleUpdateMovie}
                        >
                            <div className="form-header">
                                <input
                                    type="text"
                                    name="movieId"
                                    placeholder="Movie ID"
                                    value={movieId}
                                    onChange={(e) => setMovieId(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => loadMovieDetails(movieId)}
                                >
                                    Load Movie
                                </button>
                                <button type="submit">Update Movie</button>
                            </div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                defaultValue={movieData.title || ""}
                            />
                            <input
                                type="text"
                                name="trailer"
                                placeholder="Trailer URL"
                                defaultValue={movieData.trailer || ""}
                            />
                            <input
                                type="text"
                                name="video"
                                placeholder="Video URL"
                                defaultValue={movieData.video || ""}
                            />
                            <input
                                type="number"
                                name="year"
                                placeholder="Year"
                                defaultValue={movieData.year || ""}
                            />
                            <input
                                type="text"
                                name="release-date"
                                placeholder="Release Date"
                                defaultValue={movieData.date || ""}
                            />
                            <input
                                type="text"
                                name="age-limit"
                                placeholder="Age Limit"
                                defaultValue={movieData.ageLimit || ""}
                            />
                            <input
                                type="text"
                                name="length"
                                placeholder="Duration"
                                defaultValue={movieData.length || ""}
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                defaultValue={movieData.category || ""}
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                defaultValue={movieData.description || ""}
                            ></textarea>
                            <input type="file" name="titleImg" />
                            <input type="file" name="bgImg" />
                            <input type="file" name="previewImg" />
                        </form>

                        {/* Thêm phim */}
                        <form
                            id="add-movie-form"
                            className="movie-form"
                            onSubmit={handleAddMovie}
                        >
                            <div className="form-header">
                                <button type="submit">Add Movie</button>
                            </div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                name="trailer"
                                placeholder="Trailer URL"
                            />
                            <input
                                type="text"
                                name="video"
                                placeholder="Video URL"
                            />
                            <input
                                type="number"
                                name="year"
                                placeholder="Year"
                            />
                            <input
                                type="text"
                                name="release-date"
                                placeholder="Release Date"
                            />
                            <input
                                type="text"
                                name="age-limit"
                                placeholder="Age Limit"
                            />
                            <input
                                type="text"
                                name="length"
                                placeholder="Duration"
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                            ></textarea>
                            <input type="file" name="titleImg" />
                            <input type="file" name="bgImg" />
                            <input type="file" name="previewImg" />
                        </form>

                        {/* Xóa phim */}
                        <div className="delete-movie">
                            <div className="form-header">
                                <input
                                    type="text"
                                    placeholder="Movie ID"
                                    value={movieId}
                                    onChange={(e) => setMovieId(e.target.value)}
                                />
                                <button onClick={handleDeleteMovie}>
                                    Delete Movie
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quản lý người dùng */}
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
                                    <input
                                        type="number"
                                        name="user_id"
                                        required
                                    />
                                </label>
                                <button type="submit">Xóa</button>
                            </form>
                        </div>
                        <div>
                            <h2>Cập nhật người dùng</h2>
                            {/* <form onSubmit={handleUpdateUser}>
                                <label>
                                    ID người dùng:
                                    <input
                                        type="number"
                                        name="user_id"
                                        required
                                    />
                                </label>
                                <label>
                                    Tên người dùng:
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" required />
                                </label>
                                <label>
                                    Mật khẩu:
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                    />
                                </label>
                                <button type="submit">Cập nhật</button>
                            </form> */}
                            <form onSubmit={handleUpdateUser} className="admin-form">
                                <div className="admin-group">
                                    <label className="admin-label" htmlFor="user_id">ID người dùng:</label>
                                    <input
                                        type="number"
                                        name="user_id"
                                        id="user_id"
                                        className="admin-input"
                                        required
                                    />
                                </div>
                                <div className="admin-group">
                                    <label className="admin-label" htmlFor="username">Tên người dùng:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="admin-input"
                                        required
                                    />
                                </div>
                                <div className="admin-group">
                                    <label className="admin-label" htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="admin-input"
                                        required
                                    />
                                </div>
                                <div className="admin-group">
                                    <label className="admin-label" htmlFor="password">Mật khẩu:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="admin-input"
                                        required
                                    />
                                </div>
                                <button type="submit" className="admin-button">Cập nhật</button>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
