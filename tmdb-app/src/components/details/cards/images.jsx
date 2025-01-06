import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../stylesheets/cards/images.css';
import { Box } from "@mui/material";

const baseImageUrl = 'https://image.tmdb.org/t/p/original';

const Images = (props) => {
  const [movieData, setMovieData] = useState({ backdrops: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const label = {
    image: {
      "en-US": "Images",
      "es-MX": "Imágenes"
    },
  };

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.movieId}/images`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjg5NDg5ZThkYjdmZjA0ZjM5YzkxODczMTViZTA1NiIsIm5iZiI6MTczMzk0MTY0MC45NzEsInN1YiI6IjY3NTlkOTg4N2MzNzA0YTFhOGVjOTg5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ODxNxzYSz2DE6um5PCwLllsm7yGgARw1SfjH54a3Pt8',
              accept: 'application/json'
            }
          }
        );
        const data = await response.json();
        setMovieData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovieImages();
  }, [props.movieId]);

  if (loading) return <div style={{ color: 'white' }}>Cargando...</div>;
  if (error) return <div style={{ color: 'white' }}>Error: {error}</div>;

  const { backdrops } = movieData;

  if (!Array.isArray(backdrops) || backdrops.length === 0) {
    return <div style={{ color: 'white' }}>No hay imágenes disponibles</div>;
  }

  const sortedBackdrops = [...backdrops].sort((a, b) => b.vote_average - a.vote_average);

  return (
    <Box sx={{ width: '100%', padding: '0 16px 16px 16px' }}>
      <h2 className="images">{label.image[props.lenguage]}</h2>
      <ImageList 
        sx={{ 
          width: '100%',
          height: 'auto',
          gap: 16,
          overflowY: 'visible',
          margin: 0
        }} 
        cols={3}
      >
        {sortedBackdrops.map((backdrop, index) => (
          <ImageListItem 
            key={backdrop.file_path}
            sx={{
              overflow: 'hidden',
              borderRadius: '8px',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }
            }}
          >
            <img
              src={`${baseImageUrl}${backdrop.file_path}`}
              alt={`Backdrop ${index + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '16/9',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Images;