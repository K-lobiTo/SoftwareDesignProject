import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../stylesheets/cards/card-title.css';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '../../../contexts/themeProvider/index';
import { fetchMovieData } from '../../../tmdb/config';
import { useLanguage } from '../../../contexts/languageProvider/index.jsx';
import Box from '@mui/material/Box';

import { addMovieToUser } from '../../../firebase/firestore';
import { useAuth } from '../../../contexts/authContext';

const baseImageUrl = 'https://image.tmdb.org/t/p/original';

function CardTitle(props) {

  const { theme } = useTheme();
  const { language, languageName } = useLanguage();
  const { currentUser } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    addMovieToUser(currentUser, props.movieId);
  };

  const [movieData, setMovieData] = useState(null);

  // call the function to load the movie data
  useEffect(() => {
    async function fetchMovieInfo() {
      const movieData = await fetchMovieData(props.movieId, languageName);
      setMovieData(movieData);
    }
    fetchMovieInfo();
  }, [props.movieId, languageName]);

  if (!movieData) {
    return (
      <Box className="loading-container">
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: '#6a0dad',
          }}
        />
      </Box>
    );
  }

  return (
    <Box className="body-card"
      style={{
        background: theme.details.cardTitle.background,
      }}
    >
      <Box className="card-title"
        style={{
          background: theme.details.cardTitle.background,
        }}
      >
        <img className="image-title"
          src={baseImageUrl + movieData.poster_path}
          alt="principal_image" />
        <Box className="card-details">
          <p className="title-movie"
            style={{
              color: theme.details.cardTitle.cardTitleColor,
            }}
          >{movieData.title}</p>
          <Box className="gender-date">
            <p className="date"
              style={{
                color: theme.details.cardTitle.cardDateColor,
              }}
            >{movieData.release_date}</p>
            <p className="gender"
              style={{
                color: theme.details.cardTitle.cardGenderColor,
              }}
            >{movieData.genres.map(genre => genre.name).join(' - ')}</p>
          </Box>
          <Box className="punctuation">
            <p className="title-punctuation"
              style={{
                color: theme.details.cardTitle.titlePunctuationColor,
              }}
            >{language.details.punctuation}</p>
            <Box className="below-punctuation">
              <Box className="progress-container">
                <CircularProgress
                  variant="determinate"
                  value={movieData.vote_average * 10}
                  size={110}
                  thickness={4}
                  sx={{
                    color: theme.details.cardTitle.circularProgressColor,
                  }}
                />
                <p className="percentage-text"
                  style={{
                    color: theme.details.cardTitle.percentajeColor,
                  }}
                >{`${parseInt(movieData.vote_average * 10)}%`}</p>
              </Box>
              <IconButton className="heart-button"
                onClick={toggleFavorite}>
                <FavoriteIcon className="favorite-icon" sx={{ color: theme.details.cardTitle.iconColor, fontSize: '100px' }} />
              </IconButton>
            </Box>
          </Box>
          <Box className="resume">
            <p className="sipnosis"
              style={{
                color: theme.details.cardTitle.sipnosisColor,
              }}
            >{language.details.overview}</p>
            <p className="description"
              style={{
                color: theme.details.cardTitle.descriptionColor,
              }}
            >{movieData.overview}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CardTitle;
