import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";

const Card = ({ movie }) => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate(`/movie/${movie._id}`, { state: { movie } });
    };

    return (
        <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="movie-card">
                {/* Kiểm tra nếu movie.previewImg là chuỗi base64 và hiển thị ảnh */}
                {movie.previewImg && (
                    <img
                        src={`data:image/jpeg;base64,${movie.previewImg}`}
                        alt="Preview"
                        className="img-fluid"
                    />
                )}
                <p>
                    {movie.length} | {movie.category}
                </p>
                <div className="content">
                    <h4>{movie.title}</h4>
                    <div className="card-icons">
                        <ion-icon name="add-outline"></ion-icon>
                        <ion-icon
                            name="play-outline"
                            onClick={handlePlayClick}
                        ></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
