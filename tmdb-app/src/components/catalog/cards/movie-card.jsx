import React, { useState } from "react";
import { IconButton, Box, Container } from '@mui/material';
import '../stylesheets/cards/movie-card.css';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import {useTheme} from '../../../contexts/themeProvider/index';
import { useLanguage } from '../../../contexts/languageProvider/index';

import { addMovieToUser } from '../../../firebase/firestore';
import { useAuth } from '../../../contexts/authContext';
import { useFilter } from "../../../contexts/filters";

function MovieCard(props) {

  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { selectPage } = useFilter();

  const handleCardClick = () => {
    navigate(`/details/${props.movieId}`);
    selectPage('catalog');
  };

  const toggleFavorite = () => {
      addMovieToUser(currentUser, String(props.movieId));
  };

  return <Box className='card-movie' onClick={handleCardClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      backgroundColor: isHovered ? theme.catalog.onHoverBackground : theme.catalog.cardBackground,
      border: isHovered ? theme.catalog.onHoverBorderColor : theme.catalog.cardBorder,
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      transition: '0.3s',
      cursor: 'pointer',
    }}
  >
    <img className='image-movie' src={props.image} 
      alt={props.title} 
      onError={(e) => {
        e.target.src = 'https://i.imgflip.com/9au02y.jpg?a482136';
      }}
      />
    <h2 className="movie-name" 
      style={{
        color: isHovered ? theme.catalog.movieNameColorOnHover : theme.catalog.movieNameColor,
      }}
    >{props.title}</h2>
    <Box className='card-content'>
      <Box className='card-text'>
        <p className="punctuation-text"
          style={{
            color: isHovered ? theme.catalog.detailsColorOnHover : theme.catalog.detailsColor
          }}
        >{language.catalog.punctuation} {parseInt(props.punctuation*10)}</p>

        <p className="release-text"
          style={{
            color: isHovered ? theme.catalog.detailsColorOnHover : theme.catalog.detailsColor
          }}
        >{language.catalog.releaseDate} {props.release}</p>
      </Box>
      <Box className='button'>
        <IconButton
          className="add-to-list"
          onClick={() => {
            toggleFavorite();
        }}
        >
        <ListAltIcon sx={{
          color: isHovered ? theme.catalog.movieNameColorOnHover : theme.catalog.iconColor,
          fontSize: '50px',
        }}
      />
      </IconButton>
    </Box>
    </Box>
  </Box>
}


export default MovieCard;