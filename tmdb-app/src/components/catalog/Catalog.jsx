import React, { useState, useEffect } from "react";
import { searchMovies } from "../../tmdb/config";
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
    try {
      const results = await searchMovies(query);
      setMovies(results);
      console.log(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <SearchArea handleChange={handleChange} handleSubmit={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default Catalog;
