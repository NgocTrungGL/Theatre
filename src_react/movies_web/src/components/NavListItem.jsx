import React from "react";
import "./navListItem.css";
function NavListItem({ nav }) {
    return (
        <li>
            <a href={nav.link}>{nav.name}</a>
        </li>
    );
}

export default NavListItem;
