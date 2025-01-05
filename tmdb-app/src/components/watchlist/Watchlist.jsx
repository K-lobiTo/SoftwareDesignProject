import React, { useEffect, useState } from 'react'; 
import { useAuth } from "../../contexts/authContext/index"; 
import { getMoviesByUser, removeMovieFromUser } from "../../firebase/firestore"; 
import { getMovieById } from "../../tmdb/config"; 
import {
  Box,
  TextField,
  Button,
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
import { useLanguage } from '../../contexts/languageProvider';

const Watchlist = () => {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { languageName } = useLanguage();

  if (!currentUser) {
    return (
      <Box sx={{ color: "white", padding: 2 }}>
        Por favor inicia sesión para ver tu watchlist
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

  }

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
      console.log("Eliminando película con ID:", movieId);
  
      await removeMovieFromUser(currentUser, movieId);
      await updateMovieDetails();
      
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };
  
  if (loading) {
    return <Box sx={{ color: "white", padding: 2 }}>Cargando tus películas...</Box>;
  }

  return (
    <Box sx={{
      backgroundColor: "#6a0dad",
      color: "white",
      padding: 2,
      minHeight: "100vh",
      minWidth: "100%",
    }}>
      <Typography variant="h4" gutterBottom>Mi Lista de Películas</Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar película..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          marginBottom: 2,
          backgroundColor: "transparent",
          borderRadius: 1,
          border: "1px solid white",
          color: "white",
          'input': {
            color: "white",
          },
        }}
      />

      {filteredMovies.length === 0 ? (
        <Typography>No hay películas en tu watchlist</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: "#6a0dad" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Poster</TableCell>
                <TableCell sx={{ color: "white" }}>Título</TableCell>
                <TableCell sx={{ color: "white" }}>Duración</TableCell>
                <TableCell sx={{ color: "white" }}>Fecha de Estreno</TableCell>
                <TableCell sx={{ color: "white" }}>Estado</TableCell>
                <TableCell sx={{ color: "white" }}>Acciones</TableCell>
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
                      style={{ width: "50px", height: "75px", objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{movie.title}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{movie.release_date}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {new Date(movie.release_date) > new Date()
                      ? 'Próximamente'
                      : 'Estrenada'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(String(movie.id))}
                      sx={{ color: "#fff9f7" }}
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
