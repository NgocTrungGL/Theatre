import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UpdateUserInfo = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!token) {
            alert("Bạn cần đăng nhập để truy cập trang này.");
            navigate("/login");
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.user_id;

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/user/${userId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setFormData({
                    username: response.data.user.username,
                    email: response.data.user.email,
                    password: "",
                });
                setLoading(false);
            } catch (err) {
                setError("Không thể lấy thông tin người dùng.");
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?.user_id;

            const response = await axios.put(
                `http://localhost:5000/user/${userId}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(response.data.message || "Cập nhật thành công!");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Đã xảy ra lỗi. Vui lòng thử lại sau."
            );
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Cập nhật thông tin</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={9}
                        />
                    </label>
                </div>
                <button type="submit">Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateUserInfo;
