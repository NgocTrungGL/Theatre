import React from "react";
import "./navListItem.css";
function NavListItem({ nav, navOnClick }) {
    return (
        <li>
            <a href={nav.link}
                className={`${nav.active ? 'active': undefined}`}
                onClick={() => {
                    navOnClick(nav._id)
                }}
            >
                {nav.name}</a>
        </li>
    );
}

export default NavListItem;
