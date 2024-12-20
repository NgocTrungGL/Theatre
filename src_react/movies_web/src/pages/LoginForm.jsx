import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";

const LoginForm = ({ setCurrentPage }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset lỗi trước khi gửi yêu cầu

        try {
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                    mode: "cors",
                }
            );

            if (response.ok) {
                console.log(username, password)
                //Admin
                if (username === "admin"){
                    const data = await response.json();
                    console.log("Login successful:", data);
                    setCurrentPage("admin")
                }
                //User thuong
                else{
                    const data = await response.json();
                    console.log("Login successful:", data);
                    setCurrentPage("home"); // Chuyển hướng nếu đăng nhập thành công
                }
                
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
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
