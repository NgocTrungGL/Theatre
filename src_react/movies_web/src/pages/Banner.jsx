import React, { useState, useEffect } from "react";
import "./banner.css";

import MovieContent from "../components/MovieContent";
import MovieDate from "../components/MovieDate";
import PlayBtn from "../components/PlayBtn";
import MovieSwiper from "../components/MovieSwiper";

function Banner() {
    const [movies, setMovies] = useState([]);

    // Fetch data from the API
    const fetchData = () => {
        fetch("http://localhost:3000/data/movieData.json")
            .then((res) => res.json())
            .then((data) => {
                // Set the first movie as active initially
                const updatedMovies = data.map((movie, index) => ({
                    ...movie,
                    active: index === 0, // Set first movie as active
                }));
                setMovies(updatedMovies);
            })
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle slide change and update active movie
    const handleSlideChange = (id) => {
        // Create a new movie array with only the clicked movie set to active
        const newMovies = movies.map((movie) => ({
            ...movie,
            active: movie._id === id, // Only set the movie with matching id as active
        }));
        setMovies(newMovies); // Update the movies state
    };

    return (
        <div className="banner">
            {movies.length > 0 &&
                movies.map((movie) => (
                    <div
                        className={`movie ${
                            movie.active ? "active-movie" : ""
                        }`}
                        key={movie._id}
                    >
                        <img
                            src={movie.bgImg}
                            alt="Background"
                            className={`bgImg ${movie.active ? "active" : ""}`} // Conditional class for active movie
                        />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <MovieContent movie={movie} />
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <MovieDate movie={movie} />
                                    <PlayBtn movie={movie} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {movies.length > 0 && (
                <MovieSwiper slides={movies} slideChange={handleSlideChange} />
            )}
        </div>
    );
}

export default Banner;
