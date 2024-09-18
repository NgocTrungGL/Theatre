import React from "react";
import './movieContent.css'
import titleImg from "../img/transformer-title.png";
import './Button';
import "./Button";
import Button from "./Button";

function MovieContent() {
    return (
        <div className="content active">
        <img src={titleImg} alt="Movie-title" className="movie-title"/>
        <h4>
            <span>Year</span>
            <span>
                <i>age</i>
            </span>
            <span>length</span>
            <span>category</span>
        </h4>
        <p>
            Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. At minus reprehenderit
            nostrum. Iusto soluta quidem veritatis,
            optio, reprehenderit fugiat ratione
            cupiditate, molestias impedit quasi maiores.
        </p>
        <div className="button">
            <Button 
                icon={<ion-icon name="bookmark-outline"></ion-icon>} 
                name='Book' 
                color='#ff3700' 
                bgColor='#ffffff'
            />
            <Button icon={<ion-icon name="add-outline"></ion-icon>} name='My List'/>
        </div>
    </div>
    )
}

export default MovieContent