import React, { useState } from "react";
import "./header.css";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import Search from "../components/Search";
// import Button from "../components/Button";

function Header({ scroll }) {
    const [navList, setNavList] = useState(navListData);

    const handleNavOnClick = (id) => {
        const newNavList = navList.map((nav) => ({
            ...nav,
            active: nav._id === id,
        }));
        setNavList(newNavList);
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
                (
                    <div className="icon-only">
                        <ion-icon
                            name="person-circle-outline"
                            size="extra-large"
                        ></ion-icon>
                    </div>
                )

                <div className="profile-dropdown">
                    <div className="dropdown-divider"></div>
                    <ul className="menu-options">
                        <li>Tài khoản</li>
                        <li>Trung tâm trợ giúp</li>
                        <div className="dropdown-divider"></div>
                        <li className="logout">Đăng xuất</li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
