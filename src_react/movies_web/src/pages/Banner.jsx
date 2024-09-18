import React, { useState, useEffect } from "react";
import "./banner.css";
import bgImg from "../img/bg-transformer.jpg";
import MovieContent from "../components/MovieContent";
import MovieDate from "../components/MovieDate";
import PlayBtn from "../components/PlayBtn";

function Banner() {
    const [movies, setMovies] = useState([]);
    const fetchData = () => {
        fetch("http://localhost:3000/data/movieData.json")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((e) => console.log(e.message));
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="banner">
            <div className="movie">
                <img src={bgImg} alt="Background" className="bgImg" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <MovieContent/>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <MovieDate/>
                            <PlayBtn/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
