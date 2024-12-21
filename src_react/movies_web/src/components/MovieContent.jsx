import React from "react";
import "./movieContent.css";
import titleImg from "../img/transformer-title.png";
import "./Button";
import "./Button";
import Button from "./Button";

function MovieContent({ movie }) {
    return (
        <div className={`content ${movie.active ? "active" : undefined}`}>
            <img
                src={`data:image/jpeg;base64,${movie.titleImg}`}
                alt="Movie-title"
                className="movie-title"
            />
            <h4>
                <span>{movie.year}</span>
                <span>
                    <i>{movie.ageLimit}</i>
                </span>
                <span>{movie.lenth}</span>
                <span>{movie.category}</span>
            </h4>
            <p>{movie.description}</p>
            <div className="button">
                {/* <Button
                    icon={<ion-icon name="bookmark-outline"></ion-icon>}
                    name="Book"
                    color="#ff3700"
                    bgColor="#ffffff"
                />
                <Button
                    icon={<ion-icon name="add-outline"></ion-icon>}
                    name="My List"
                /> */}
            </div>
        </div>
    );
}

export default MovieContent;
