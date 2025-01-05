import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../stylesheets/cards/images.css';
import { Container, Box } from "@mui/material";


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

  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const { backdrops } = movieData;

  if (!Array.isArray(backdrops) || backdrops.length === 0) {
    return <div>No hay imágenes disponibles</div>;
  }

  const sortedBackdrops = [...backdrops].sort((a, b) => b.vote_average - a.vote_average);

  return (
    <Container className='container'>
      <h1 className='images'>{label.image[props.lenguage]}</h1>
      <Container className='backdrop'>
      <ImageList
        sx={{
          display: 'grid',
          gap: '20px',
          maxWidth: '94%',
          margin: '0 auto',
        }}
        cols={3}
      >
        {sortedBackdrops.map((backdrop, index) => (
          <ImageListItem key={backdrop.file_path}>
            <img
              {...srcset(`${baseImageUrl}${backdrop.file_path}`, 400, 4, 4)}
              alt={`Backdrop ${index + 1}`}
              loading="lazy"
              style={{
                objectFit: 'cover',
                width: 'auto',
                height: 'auto',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>


      </Container>
    </Container>
  );
};

export default Images;
