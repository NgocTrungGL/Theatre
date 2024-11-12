import React, { useState } from "react";
import "./header.css";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import Search from "../components/Search";
import Button from "../components/Button";

function Header({ scroll }) {
    const [navList, setNavList] = useState(navListData);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleNavOnClick = (id) => {
        const newNavList = navList.map((nav) => ({
            ...nav,
            active: nav._id === id,
        }));
        setNavList(newNavList);
    };

    const handleBtnOnClick = () => {
        setIsButtonClicked((prev) => !prev);
    };

    return (
        <header className={`${scroll > 100 ? "scrolled" : ""}`}>
            <a href="/" className="logo">
                Ciname
            </a>
            <ul className="nav">
                {navList.map((nav) => (
                    <NavListItem key={nav._id} nav={nav} navOnClick={handleNavOnClick} />
                ))}
            </ul>
            <Search />
            <div className="button-container" onClick={handleBtnOnClick}>
                {!isButtonClicked ? (
                    <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name="Sign In" />
                ) : (
                    <div className="icon-only">
                        <ion-icon name="person-circle-outline" size="large"></ion-icon>
                    </div>
                )}
                {isButtonClicked && (
                    <div className="profile-dropdown">
                        <div className="dropdown-divider"></div>
                        <ul className="menu-options">
                            <li>Quản lý hồ sơ</li>
                            <li>Chuyển hồ sơ</li>
                            <li>Tài khoản</li>
                            <li>Trung tâm trợ giúp</li>
                            <div className="dropdown-divider"></div>
                            <li className="logout">Đăng xuất khỏi Netflix</li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
