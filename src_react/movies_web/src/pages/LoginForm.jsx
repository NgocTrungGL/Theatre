import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setCurrentPage }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (username === "admin" && password === "123456789") {
            navigate("/admin");
            return;
        }
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/users/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                    mode: "cors",
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);

                // Redirect based on server response role
                if (data.role === "admin") {
                    setCurrentPage("admin");
                } else {
                    setCurrentPage("home");
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
