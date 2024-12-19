// import React from "react";
// import "./search.css";
// function Search() {
//     return (
//         <div className="search">
//             <input type="text" placeholder="Search" />
//             <ion-icon name="search-outline"></ion-icon>
//         </div>
//     );
// }

// export default Search;
import React, { useState, useEffect } from "react";
import Search from "./Search";
import "./search.css";

function MovieSearchApp() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/movies"); // Replace with actual API endpoint
                if (!response.ok) throw new Error("Failed to fetch movies");
                const data = await response.json();
                setMovies(data);
                setFilteredMovies(data);
            } catch (error) {
                console.error(error);
                alert("Could not fetch movies. Please try again later.");
            }
        };
        fetchMovies();
    }, []);

    const handleSearch = (query) => {
        if (query.trim() === "") {
            setFilteredMovies(movies);
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = movies.filter((movie) =>
                movie.title.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredMovies(filtered);
        }
    };

    return (
        <div className="movie-search-app">
            <h1>Movie Search</h1>
            <Search onSearch={handleSearch} />
            <div className="movie-list">
                {filteredMovies.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    filteredMovies.map((movie) => (
                        <div key={movie.movie_id} className="movie-card">
                            <img
                                src={movie.titleImg}
                                alt={movie.title}
                                className="movie-image"
                            />
                            <h2>{movie.title}</h2>
                            <p>{movie.year}</p>
                            <p>{movie.category}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MovieSearchApp;
