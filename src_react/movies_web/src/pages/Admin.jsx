import React, { useState } from "react";
import "./admin.css";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("admin");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleDeleteUser = () => {
        // const userId = document.getElementById("delete-user-id").value;
        // const username = document.getElementById("delete-user-username").value;

        // if (userId && username) {
        //     alert(`User with ID: ${userId} and Username: ${username} has been deleted.`);
        // } else {
        //     alert("Please provide both User ID and Username to delete the user.");
        // }
        
    };

    const handleDeleteMovie = () => {
        // alert("Delete Movie");

    };

    return (
        <div className="admin-dashboard">
            <div className="navbar">
                <button onClick={() => handleSectionChange("admin")}>Quản Lý Phim</button>
                <button onClick={() => handleSectionChange("users")}>Quản Lý Người Dùng</button>
            </div>

            <div className="container">
                {activeSection === "admin" && (
                    <section id="admin" className="admin-section">
                        <h1>Quản Lý Phim</h1>

                        <section className="form-section">
                            <h2>Thêm Phim</h2>
                            <form id="add-movie-form">
                                <input type="text" placeholder="Tiêu Đề Phim" required />
                                <input type="file" accept="image/*" required />
                                <input type="text" placeholder="Thể Loại" required />
                                <input type="number" placeholder="Năm Phát Hành" required />
                                <input type="text" placeholder="URL Phim (Trailer hoặc Phim đầy đủ)" required />
                                <textarea placeholder="Mô Tả" required></textarea>
                                <button type="submit">Thêm Phim</button>
                            </form>
                        </section>

                        <section className="delete-section">
                            <h2>Xóa Phim</h2>
                            <input type="text" placeholder="Tên Phim" onChange={() => {}} />
                            <button onClick={handleDeleteMovie}>Xóa Phim</button>
                        </section>
                    </section>
                )}

                {activeSection === "users" && (
                    <section id="users" className="admin-section">
                        <h1>Quản Lý Người Dùng</h1>

                        <section className="form-section">
                            <h2>Thêm Người Dùng</h2>
                            <form id="add-user-form">
                                <input type="text" placeholder="Tên Người Dùng" required />
                                <input type="email" placeholder="Email" required />
                                <input type="password" placeholder="Mật Khẩu" required />
                                <button type="submit">Thêm Người Dùng</button>
                            </form>
                        </section>

                        <section className="delete-section">
                            <h2>Xóa Người Dùng</h2>
                            <input type="text" id="delete-user-id" placeholder="Nhập ID Người Dùng" required />
                            <input type="text" id="delete-user-username" placeholder="Nhập Tên Người Dùng" required />
                            <button onClick={handleDeleteUser}>Xóa Người Dùng</button>
                        </section>
                    </section>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;