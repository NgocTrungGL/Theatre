import React, { useState, useEffect } from "react";
import "./banner.css";

import MovieContent from "../components/MovieContent";
import MovieDate from "../components/MovieDate";
import PlayBtn from "../components/PlayBtn";
import MovieSwiper from "../components/MovieSwiper";

function Banner() {
    const [movies, setMovies] = useState([]); // Danh sách phim
    const [currentIndex, setCurrentIndex] = useState(0); // Chỉ số phim đang hoạt động

    // Hàm fetch dữ liệu từ API
    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/movies");
            const data = await response.json();
            const updatedMovies = data.map((movie, index) => ({
                ...movie,
                active: index === 0, // Đặt bộ phim đầu tiên làm phim "active"
            }));
            setMovies(updatedMovies);
        } catch (error) {
            console.error("Error fetching movies:", error.message);
        }
    };

    // Lấy dữ liệu khi component render lần đầu
    useEffect(() => {
        fetchData();
    }, []);

    // Hàm xử lý khi chuyển slide hoặc click vào phim
    const handleSlideChange = (id) => {
        const newMovies = movies.map((movie) => ({
            ...movie,
            active: movie.movie_id === id, // Chỉ đặt "active" cho phim có id khớp
        }));
        const newIndex = movies.findIndex((movie) => movie.movie_id === id);
        setMovies(newMovies);
        setCurrentIndex(newIndex); // Cập nhật chỉ số phim đang hoạt động
    };

    // Hàm tự động chuyển sang phim tiếp theo
    const nextMovie = () => {
        if (movies.length === 0) return;
        const nextIndex = (currentIndex + 1) % movies.length;
        handleSlideChange(movies[nextIndex].movie_id);
    };

    return (
        <div className="banner">
            {movies.length > 0 &&
                movies.map((movie, index) => (
                    <div
                        className={`movie ${
                            movie.active ? "active-movie" : ""
                        }`}
                        key={movie._id}
                        onClick={() => {
                            handleSlideChange(movie.movie_id); // Cập nhật trạng thái phim
                        }}
                    >
                        <img
                            src={`data:image/jpeg;base64,${movie.bgImg}`}
                            alt="Background"
                            className={`bgImg ${movie.active ? "active" : ""}`}
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
                <MovieSwiper
                    slides={movies}
                    slideChange={handleSlideChange} // Xử lý khi người dùng chuyển slide
                    onNext={nextMovie} // Chuyển slide tự động
                />
            )}
        </div>
    );
}

export default Banner;
