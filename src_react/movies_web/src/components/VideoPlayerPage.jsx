import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./VideoPlayerPage.css";

const VideoPlayerPage = () => {
    const location = useLocation(); // Lấy dữ liệu phim từ state
    const navigate = useNavigate();
    const { movie } = location.state || {}; // Nếu không có dữ liệu thì movie = undefined

    // Kiểm tra nếu không có dữ liệu phim
    if (!movie) {
        return (
            <div className="no-data">
                <p>No video data available.</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        );
    }
    return (
        <div className="video-player-page">
            <button className="back-button" onClick={() => navigate("/")}>
                Back
            </button>
            <div className="player-wrapper">
                <ReactPlayer
                    url={movie.trailer}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default VideoPlayerPage;
