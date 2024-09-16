import React from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";

function Header() {
    return (
        <header>
            <a href="/" className="logo">
                Ciname
            </a>
            <ul className="nav">
                {navListData.map((nav) => (
                    <NavListItem key={nav._id} nav={nav} />
                ))}
            </ul>
        </header>
    );
}

export default Header;
