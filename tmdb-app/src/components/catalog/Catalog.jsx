import React, { useState, useEffect } from "react";
import { tmdb, searchMovies } from "../../tmdb/config";
import SearchArea from "./SearchArea";
import MovieList from "./MovieList";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await tmdb.get("/movie/popular");
//         setMovies(response.data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };
//     fetchMovies();
//   }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;
    console.log("noooo");
    try {
      const results = await searchMovies(query); 
      setMovies(results);
      console.log(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  const handleChange = (e) => {setQuery(e.target.value)};

  return (
    <div>
       <SearchArea handleChange={handleChange} handleSubmit={handleSearch}  />
      {/*<h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.release_date})
          </li>
        ))}
      </ul> */}
      

      {/* <div>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date || "N/A"}</p>
                <p>{movie.overview || "No description available."}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found. Try searching for something else!</p>
        )}
      </div> */}
      <MovieList movies={movies}/>


    </div>
  );
};

export default Catalog;
