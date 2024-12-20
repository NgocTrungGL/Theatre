import React from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const MovieDetail = () => {
    const location = useLocation();
    const movie = location.state.movie;

    return (
        <div className="movie-detail">
            <h2>{movie.title}</h2>
            <VideoPlayer url={movie.video} />
        </div>
    );
};

export default MovieDetail;
