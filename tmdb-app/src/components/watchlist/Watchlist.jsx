import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";
import { getMoviesByUser, removeMovieFromUser } from "../../firebase/firestore";
import { getMovieById } from "../../tmdb/config";
import { useTheme } from "../../contexts/themeProvider/index";
import { useLanguage } from '../../contexts/languageProvider';
import { useFilter } from "../../contexts/filters";
import SearchIcon from "@mui/icons-material/Search";

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
  const { language, languageName } = useLanguage();
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
  }, [currentUser, languageName]);

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ 
            fontWeight: 700,
            marginBottom: 0,
            minWidth: 'fit-content' 
          }}
        >
          {language.watchlist.title}
        </Typography>
        <Box
          sx={{
            minWidth: "400px", 
            maxWidth:  "80vw",
            paddingLeft:"15px",
            margin: '24px 20px',
            border: '1px solid',
            borderColor: theme.catalog.boxBorderColor,
            borderRadius: '50px',
          }}
        >
          <TextField
            variant="outlined"
            placeholder={language.watchlist.searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: ( 
                <SearchIcon sx={{ color: theme.watchlist.search.textColor, marginRight: 1 }} />
              ),
            }}
            sx={{
              minWidth: "77vw",
              backgroundColor: theme.watchlist.search.background,
              borderRadius: "25px",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.watchlist.search.background,
                  borderWidth: '2px',
                  borderRadius: "25px",
                },
                '&:hover fieldset': {
                  borderColor: theme.watchlist.search.background,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.watchlist.search.background,
                },
                '& .MuiInputBase-input': {
                  color: theme.watchlist.search.inputColor,
                  textDecoration: 'none',
                  textAlign: 'left', 
                },
              },
              input: {
                color: theme.watchlist.search.inputColor,
                padding: "10px 16px",
                textDecoration: 'none',
                textAlign: 'left', 
                '&::placeholder': {
                  color: theme.watchlist.search.inputColor,
                  opacity: 0.8,
                },
              },
              '& .MuiInputBase-root': {
                textDecoration: 'none',
              }
            }}
          />
        </Box>
      </Box>

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
    border: "none", // Elimina cualquier borde del contenedor
    borderRadius: "8px", // Opcional: añade bordes redondeados si lo deseas
    boxShadow: "none", // Evita cualquier sombra que pueda interferir
  }}
>
  <Table
    sx={{
      borderCollapse: "collapse", // Asegura que los bordes colapsen entre filas
      width: "100%", // Asegura el ancho completo
    }}
  >
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: theme.watchlist.tableHeaderBackground, // Color del encabezado
        }}
      >
        <TableCell sx={{ fontWeight: "bold", color: theme.watchlist.tableHeaderColor }}>{language.watchlist.poster}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: theme.watchlist.tableHeaderColor }}>{language.watchlist.movieTitle}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: theme.watchlist.tableHeaderColor }}>{language.watchlist.duration}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: theme.watchlist.tableHeaderColor }}>{language.watchlist.releaseDate}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: theme.watchlist.tableHeaderColor }}>{language.watchlist.status}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: theme.watchlist.tableHeaderColor }}>{language.watchlist.actions}</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {filteredMovies.map((movie, index) => (
        <TableRow
          key={movie.id}
          sx={{
            backgroundColor: theme.watchlist.rowBackground, // Fondo de cada fila
            "&:nth-of-type(even)": {
              backgroundColor: theme.watchlist.alternateRowBackground, // Fondo alternativo para filas pares
            },
            borderBottom: `3px solid ${theme.watchlist.rowBorderColor}`,
            borderTop:`3px solid ${theme.watchlist.rowBorderColor}`,
          }}
        >
          <TableCell>
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                : '/placeholder-movie.png'}
              alt={movie.title}
              style={{
                width: "50px",
                height: "75px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid transparent", // Opcional: ajusta bordes
              }}
            />
          </TableCell>
          <TableCell
            onClick={() => handleNavigate(movie.id)}
            sx={{ cursor: "pointer", color: theme.watchlist.tableHeaderColor }}
          >
            {movie.title}
          </TableCell>
          <TableCell sx={{ color: theme.watchlist.tableHeaderColor }}>
            {movie.runtime ? `${movie.runtime} ${language.watchlist.minutes}` : language.watchlist.notAvailable}
          </TableCell>
          <TableCell sx={{ color: theme.watchlist.tableHeaderColor }}>
            {movie.release_date}
          </TableCell>
          <TableCell sx={{ color: theme.watchlist.tableHeaderColor }}>
            {new Date(movie.release_date) > new Date()
              ? language.watchlist.upcoming
              : language.watchlist.released}
          </TableCell>
          <TableCell>
            <IconButton
              onClick={() => handleDelete(String(movie.id))}
              sx={{ color: theme.watchlist.tableHeaderColor }}
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
