import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./header.css";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import Search from "../components/Search";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

function Header({ scroll }) {
    const [navList, setNavList] = useState(navListData);
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    const handleNavOnClick = (id) => {
        const newNavList = navList.map((nav) => ({
            ...nav,
            active: nav._id === id,
        }));
        setNavList(newNavList);
    };

    const handleLogout = () => {
        // Xử lý logic đăng xuất
        sessionStorage.removeItem("user"); // Xóa thông tin người dùng
        sessionStorage.removeItem("token"); // Xóa token đăng nhập
        navigate("/login"); // Chuyển hướng về trang Login
    };

    const handleAccountClick = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Kiểm tra token hợp lệ và chưa hết hạn
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp > currentTime) {
                    navigate("/update-user-info"); // Chuyển hướng đến trang cập nhật thông tin tài khoản
                } else {
                    alert("Token đã hết hạn. Vui lòng đăng nhập lại.");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error);
                navigate("/login");
            }
        } else {
            alert("Bạn cần đăng nhập để xem thông tin tài khoản.");
            navigate("/login");
        }
    };

    return (
        <header className={`${scroll > 100 ? "scrolled" : ""}`}>
            <a href="/" className="logo">
                Ciname
            </a>
            <ul className="nav">
                {navList.map((nav) => (
                    <NavListItem
                        key={nav._id}
                        nav={nav}
                        navOnClick={handleNavOnClick}
                    />
                ))}
            </ul>
            <Search />
            <div className="button-container">
                <div className="icon-only">
                    <ion-icon
                        name="person-circle-outline"
                        size="extra-large"
                    ></ion-icon>
                </div>
                <div className="profile-dropdown">
                    <div className="dropdown-divider"></div>
                    <ul className="menu-options">
                        <li onClick={handleAccountClick}>Tài khoản</li>
                        <li>Trung tâm trợ giúp</li>
                        <div className="dropdown-divider"></div>
                        <li className="logout" onClick={handleLogout}>
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
