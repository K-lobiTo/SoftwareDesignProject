import React, { useState, useEffect } from "react";
import { searchMovies, getGenres, getMoviesByGenre, getAllMovies } from "../../tmdb/config";
import SearchArea from "./SearchArea";
import MovieList from "./MovieList";
import GenreList from "./GenreList"; 

import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

const Catalog = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genres = await getGenres();
        setGenres(genres);
        const allMovies = await getAllMovies(); // Fetch all movies if no genre is selected
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching genres and movies:", error);
      }
    };
    fetchGenresAndMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await performSearch(query);
  };

  const performSearch = async (searchQuery) => {
    try {
      const results = await searchMovies(searchQuery, selectedGenre);
      setMovies(results);
      console.log(results);
    } catch (err) {
      console.error("Failed to fetch movies. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = async (genreId) => {
    setSelectedGenre(genreId);
    if (genreId) {
      try {
        const results = await getMoviesByGenre(genreId);
        setMovies(results);
        console.log(results);
      } catch (err) {
        console.error("Failed to fetch movies by genre. Please try again later.");
      }
    } else {
      try {
        const allMovies = await getAllMovies(); // Fetch all movies if no genre is selected
        setMovies(allMovies);
        console.log(allMovies);
      } catch (err) {
        console.error("Failed to fetch all movies. Please try again later.");
      }
    }
  };

  return (
    <Box sx={{ margin: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <SearchArea handleChange={handleChange} handleSubmit={handleSearch} />
        <GenreList
          genres={genres}
          selectedGenre={selectedGenre}
          handleFilterChange={handleFilterChange}
        />
        <SearchIcon
          onClick={handleSearch}
          sx={{ cursor: 'pointer' }}
        />
      </Box>
      <MovieList movies={movies} />
    </Box>
  );
};

export default Catalog;
