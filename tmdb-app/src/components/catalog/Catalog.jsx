import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

// import material ui components
import { Grid2, Container, Box } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

// import components
import MovieCard from "./cards/movie-card";
import GenreList from "./cards/GenreList";
import { getGenres, getMoviesByGenre, getAllMovies, searchMovies } from "../../tmdb/config";
import "./stylesheets/catalog.css";
import SearchArea from "./cards/SearchArea";

import { useTheme } from "../../contexts/themeProvider/index.jsx";
import { useFilter } from "../../contexts/filters/index.jsx";
import { useLanguage } from "../../contexts/languageProvider/index.jsx";


function Catalog() {

  // Theme
  const { theme } = useTheme();
  const { language, languageName } = useLanguage();
  const { gender, movieName, selectGender, selectMovieName, numberPage, selectNumberPage } = useFilter();


  // GENDER
  const [enableSearch, setEnableSearch] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(gender);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genres = await getGenres(languageName);
        setGenres(genres);
        const allMovies = await getAllMovies(languageName, page)[0];
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching genres and movies:", error);
      }
    };
      fetchGenresAndMovies();
  }, [languageName]);

  // Function to manage the change of the filter gender
  const handleFilterChange = async (genreId) => {
    setSelectedGenre(genreId);
    selectGender(genreId);
    setLoading(true);
      try {
        const results = await getMoviesByGenre(genreId, languageName, page);
        setMovies(results[0]);
        setLoading(false);
        setTotalPages(results[1]);

        if(genreId !== "") {
          selectGender(genreId);
          setPage(1);
          selectNumberPage(1);
        }

        else {
          setPage(1);
          selectNumberPage(1);
        }
      } catch (err) {
        console.error("Failed to fetch movies by genre. Please try again later.");
    }
  };
  
  // PAGINATION
  const [page, setPage] = useState(numberPage);
  const changePage = (event, value) => {
    selectNumberPage(page);
    setPage(value);
  }

  // SEARCH BY NAME
  const [query, setQuery] = useState(movieName);

  const handleSearch = async (e) => {
    e.preventDefault();
    await performSearch(query);
  };

  const performSearch = async (searchQuery) => {
    try {
      const results = await searchMovies(searchQuery, languageName, page, selectedGenre);
      setMovies(results[0]);

      setTotalPages(results[1]);
      selectMovieName(searchQuery);

      if(query !== "") {
        setSelectedGenre("");
        setPage(1);
        selectNumberPage(1);
      }

      else {
        setPage(1);
        selectNumberPage(1);
      }

    } catch (err) {
      console.error("Failed to fetch movies. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  
  const [totalPages, setTotalPages] = useState(1);

  // GET ALL MOVIES
  // movies state
  const [movies, setMovies] = useState([]);

  // Animation of loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
  
      try {
        var movieResults;
        let response;
  
        if (selectedGenre !== "") {
          response = await getMoviesByGenre(selectedGenre, languageName, page);
          movieResults = response[0];
        } else if (query !== "" && selectedGenre === "") {
          response = await searchMovies(query, languageName, page, selectedGenre);
          movieResults = response[0];
        } else if (query !== "" && selectedGenre) {
          setSelectedGenre("");
          response = await searchMovies(query, languageName, page, selectedGenre);
          movieResults = response[0];
        } else {
          response = await getAllMovies(languageName, page);
          movieResults = response[0];
          setTotalPages(response[1]);
        }
  
        setMovies(movieResults);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [selectedGenre, page, languageName, movieName]);

  useEffect(() => {
    setSelectedGenre(gender);
    setQuery(movieName);
  
    if (movieName !== "") {
      setEnableSearch(false);
      setVisibleFilter(false);
      selectNumberPage(1);
    } else if (gender !== "") {
      setEnableSearch(true);
      setVisibleFilter(true);
      selectNumberPage(1);
    } else {
      setEnableSearch(false);
      setVisibleFilter(true);
      selectNumberPage(1);
    }
  }, [gender, movieName, page]);
  
  // Pages
  useEffect(() => {
    selectNumberPage(page);
    console.log('page: ' + page);
  }, [page]);
  
  
  return (
    <Container className="catalog"
      style={{
        backgroundColor: theme.catalog.background,
        overflowX: 'hidden',
      }}
      sx={{
        backgroundColor: theme.catalog.background,
      }}
    >
      <Box className="title-filter">
        <h1 className="title-catalog"
          style={{ 
            color: theme.catalog.titleColor,
          }}
        >{language.catalog.catalog}</h1>
        <SearchArea 
          handleChange={handleChange} 
          handleSubmit={handleSearch} 
          lenguage={languageName}
          query={query}
          enabled={enableSearch}
        />
        
        <GenreList
          genres={genres}
          selectedGenre={selectedGenre}
          handleFilterChange={handleFilterChange}
          lenguage={languageName}
          visibility={visibleFilter}
          />
      </Box>
      <Box className="catalog-grid">
      {loading ? (
        <Box className="loading-spinner" style={{ textAlign: 'center' }}>
          <CircularProgress size={60} style={{ color: '#572974' }} />
        </Box>
      ) : (
        <Grid2 container 
          rowSpacing={4} 
          columnSpacing={{ xs: 10, sm: 2, md: 3 }}
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
        >
          {movies.map((movie, index) => (
            <Grid2 item key={index}>
              <MovieCard
                movieId={movie.id}
                image={movie.posterPath}
                title={movie.title}
                release={movie.release}
                punctuation={movie.punctuation}
                lenguage={languageName}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
      </Box>
      <Box className="pagination"
        style={{
          backgroundColor: theme.catalog.background,
        }}
      >
        <Pagination
          page={page} 
          onChange={changePage}
          count={totalPages} 
          siblingCount={1}
          boundaryCount={2}
          sx={{
            backgroundColor: theme.catalog.paginationBackground,
            boxShadow: "none",
            border: "none",
            "& .MuiPaginationItem-root": {
              fontSize: "25px",
              fontFamily: "Arial, sans-serif",
              color: theme.catalog.paginationNumberColor,
              width: "5vw",
              margin: "0 15px",
            },
            "& .Mui-selected": {
              backgroundColor: theme.catalog.paginationBackgroundSelect,
              color: theme.catalog.paginationNumberColorSelect,
              fontWeight: "bold",
            },
            "& .MuiPaginationItem-previousNext": {
              color: theme.catalog.paginationNumberColor,
            },
            "& .MuiPaginationItem-previousNext:hover": {
              color: theme.catalog.paginationNumberColor,
            },
            "& .MuiPaginationItem-previousNext.Mui-selected": {
              backgroundColor: theme.catalog.paginationBackgroundSelect,
              olor: theme.catalog.paginationNumberColorSelect,
            },
            ".MuiPaginationItem-previousNext.Mui-selected svg": {
              color: "transparent !important",
            }
          }}
        />
      </Box>
    </Container>
  );
}

export default Catalog;
