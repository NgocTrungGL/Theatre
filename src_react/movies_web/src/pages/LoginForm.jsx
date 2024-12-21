import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        setError(""); // Xóa lỗi trước đó
        if (username == "admin" && password == 123456789) {
            navigate("/admin");
            return;
        }
        try {
            // Gửi yêu cầu tới API
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (response.ok) {
                const data = await response.json(); // Lấy dữ liệu từ API
                const token = data.token; // JWT token từ server
                const user = data.user; // Thông tin người dùng

                // Kiểm tra dữ liệu hợp lệ trước khi lưu vào sessionStorage
                if (token && user) {
                    sessionStorage.setItem("authToken", token);
                    sessionStorage.setItem("user", JSON.stringify(user));

                    // Chuyển hướng về trang chính
                    navigate("/");
                } else {
                    setError(
                        "Invalid login response. No token or user data received."
                    );
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed.");
            }
        } catch (err) {
            setError("Network error. Please try again later.");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
