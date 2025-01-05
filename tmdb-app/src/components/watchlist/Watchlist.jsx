import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useAuth } from "../../contexts/authContext/index";
import { getMoviesByUser, removeMovieFromUser } from "../../firebase/firestore";
import { getMovieById } from "../../tmdb/config";
import { useTheme } from "../../contexts/themeProvider/index";
import { useLanguage } from '../../contexts/languageProvider';
import { useFilter} from "../../contexts/filters";

import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Watchlist = () => {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const { language, languageName} = useLanguage();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 
  const { selectPage } = useFilter();

  if (!currentUser) {
    return (
      <Box sx={{ color: theme.watchlist.emptyStateColor, padding: 2 }}>
        {language.watchlist.loginRequired}
      </Box>
    );
  }

  const updateMovieDetails = async () => {
    try {
      const usrMovieIds = await getMoviesByUser(currentUser);
      const movieDetailsPromises = usrMovieIds.map(id => getMovieById(id, languageName));
      const movieDetails = await Promise.all(movieDetailsPromises);

      setMovies(movieDetails);
      setFilteredMovies(movieDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateMovieDetails();
  }, [currentUser, languageName],);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(term));
    setFilteredMovies(filtered);
  };

  const handleDelete = async (movieId) => {
    try {
      await removeMovieFromUser(currentUser, movieId);
      await updateMovieDetails();
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  const handleNavigate = (movieId) => {
    selectPage('watchlist');
    navigate(`/details/${movieId}`);
  };

  if (loading) {
    return (
      <Box sx={{ color: theme.watchlist.loadingTextColor, padding: 2 }}>
        {language.watchlist.loading}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.watchlist.background,
        color: theme.watchlist.titleColor,
        padding: 2,
        minHeight: "100vh",
        minWidth: "100%",
        transition: "background-color 0.3s ease",
      }}
    >
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 2 
      }}>
        <Typography variant="h4" gutterBottom>
          {language.watchlist.title}
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder={language.watchlist.searchPlaceholder}
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          marginBottom: 2,
          backgroundColor: theme.watchlist.searchBackground,
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.watchlist.searchBorder,
            },
            '&:hover fieldset': {
              borderColor: theme.watchlist.searchBorder,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.watchlist.searchBorder,
            },
          },
          'input': {
            color: theme.watchlist.searchTextColor,
            '&::placeholder': {
              color: theme.watchlist.searchPlaceholderColor,
              opacity: 1,
            },
          },
        }}
      />

      {filteredMovies.length === 0 ? (
        <Typography sx={{ color: theme.watchlist.emptyStateColor }}>
          {language.watchlist.empty}
        </Typography>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            backgroundColor: theme.watchlist.tableBackground,
            transition: "background-color 0.3s ease",
            border: theme.watchlist.tableBorder,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{language.watchlist.poster}</TableCell>
                <TableCell>{language.watchlist.movieTitle}</TableCell>
                <TableCell>{language.watchlist.duration}</TableCell>
                <TableCell>{language.watchlist.releaseDate}</TableCell>
                <TableCell>{language.watchlist.status}</TableCell>
                <TableCell>{language.watchlist.actions}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <img
                      src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : '/placeholder-movie.png'}
                      alt={movie.title}
                      style={{ width: "50px", height: "75px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </TableCell>
                  <TableCell 
                    onClick={() => handleNavigate(movie.id)} 
                    sx={{ cursor: "pointer", color: theme.watchlist.linkColor }}
                  >
                    {movie.title}
                  </TableCell>
                  <TableCell>{movie.runtime ? `${movie.runtime} ${language.watchlist.minutes}` : language.watchlist.notAvailable}</TableCell>
                  <TableCell>{movie.release_date}</TableCell>
                  <TableCell>
                    {new Date(movie.release_date) > new Date()
                      ? language.watchlist.upcoming
                      : language.watchlist.released}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(String(movie.id))}
                      sx={{ color: theme.watchlist.deleteIconColor }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Watchlist;
