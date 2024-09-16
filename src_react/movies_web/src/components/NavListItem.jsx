import React from "react";

function NavListItem({ nav }) {
    return (
        <li>
            <a href={nav.link}>{nav.name}</a>
        </li>
    );
}

export default NavListItem;
