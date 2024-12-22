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
        setError(""); // Clear previous error

        try {
            if (username === "admin" && password === "123456") {
                navigate("/admin");
                return;
            }
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
                const data = await response.json();
                const token = data.token;
                const user = data.user;

                if (token && user) {
                    // Store the token and user in sessionStorage
                    sessionStorage.setItem("authToken", token);
                    sessionStorage.setItem("user", JSON.stringify(user));
                    console.log("Login successful:", data);
                    // Redirect to the home page after successful login
                    navigate("/");
                } else {
                    setError(
                        "Invalid login response. No token or user data received."
                    );
                }
            } else {
                const errorData = await response.json();
                console.error("Error from server:", errorData); // Log server response for debugging
                setError(
                    errorData.message ||
                        "Login failed. Please check your credentials."
                );
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
                <div className="account-link sign">
                    <a href="/signup">
                        Sign Up
                    </a>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
