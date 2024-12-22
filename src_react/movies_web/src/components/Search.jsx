import React, { useState, useEffect } from "react";
import "./search.css";

function Search({ onSearch }) {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
            />
            <ion-icon name="search-outline"></ion-icon>
        </div>
    );
}

function SearchApp() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Fetch movie data from API
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/movies");
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    const handleSearch = (query) => {
        if (query.trim() === "") {
            setFilteredMovies([]);
            setIsSearching(false);
        } else {
            setIsSearching(true);
            const lowerCaseQuery = query.toLowerCase();
            const filtered = movies.filter((movie) =>
                movie.title.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredMovies(filtered);
        }
    };

    return (
        <div className={`search-app ${isSearching ? "searching" : ""}`}>
            <Search onSearch={handleSearch} />
            {isSearching && <div className="overlay"></div>}
            {isSearching && filteredMovies.length > 0 ? (
                <div className="movie-grid">
                    {filteredMovies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`data:image/jpeg;base64,${movie.titleImg}`} // Thêm prefix `data:image/...`
                                alt={movie.title}
                                className="movie-image"
                            />
                            <div className="movie-title">{movie.title}</div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default SearchApp;
