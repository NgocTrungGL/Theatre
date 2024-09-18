import React from "react";
import './button.css'

function Button({icon, name, bgcolor = '#ff3700', color="#ffffff"}) {
    return (
        <a 
            href="#" 
            className="mainBtn" 
            style={{color: color, background: bgcolor}}
        > 
        {icon} {name}
        </a>
    );
}

export default Button;