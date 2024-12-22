import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import { MdEmail } from "react-icons/md";

import "./DKForm.css";

const DKForm = ({ setCurrentPage }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt refresh
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate("/");
            } else {
                alert(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <button type="submit">Sign Up</button>
                <div className="account-link">
                    <a href="/login">
                        Already have an account?
                    </a>
                </div>
            </form>
        </div>
    );
};

export default DKForm;
