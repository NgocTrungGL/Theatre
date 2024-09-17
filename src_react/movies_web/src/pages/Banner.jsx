import React, { useState, useEffect } from "react";
import "./banner.css";
import bgImg from "../img/bg-transformer.jpg";
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
                            <div className="content">
                                <img
                                    src=""
                                    alt="Movie-title"
                                    className="movie-title"
                                />
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
                                <div className="button">Button</div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
