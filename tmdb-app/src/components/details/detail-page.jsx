import React, { useEffect, useState } from 'react';
import Videos from './cards/videos.jsx'
import CardTitle from './cards/card-title.jsx'
import CardInfo from './cards/card-info'
import Cast from './cards/cast.jsx'
import './stylesheets/detail-page.css'
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../contexts/themeProvider/index';

import Images from './cards/images.jsx'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Box } from "@mui/material";
import { useFilter } from "../../contexts/filters/index.jsx";


function DetailPage(props) {

  const { theme } = useTheme();

  const navigate = useNavigate();

  const [buttonPosition, setButtonPosition] = useState(100);

  const { page } = useFilter();

  const handleBack = () => {

    if(page === 'catalog'){
      navigate(`/catalog`);
    }

    else if(page === 'watchlist'){
      navigate(`/watchlist`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newPosition = Math.max(10, 100 - scrollY);
      setButtonPosition(newPosition);
    };

    window.addEventListener('scroll', handleScroll);

    // Limpieza del evento
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return <Container className='main-container-details'>
    <IconButton 
        className='back-button' 
        onClick={handleBack} 
        style={{
          position: 'fixed',
          top:  `${buttonPosition}px`,
          left: '20px',
          zIndex: 1000,
          backgroundColor: theme.details.button.background,
          color: theme.details.button.color,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <CardTitle movieId={props.movieId}
        lenguage={props.lenguage}
      />

      <Box className='details'>
        <Box className='videos-cast'
          style={{
            background: theme.details.cast.background,
          }}
        >

            <Cast movieId={props.movieId}
                lenguage={props.lenguage}
            />

            <Videos movieId={props.movieId}
                lenguage={props.lenguage}
            />

        </Box>
        <CardInfo
          lg={props.lenguage}
          movieId={props.movieId}
        />
      </Box>
      
    </Container>
}

export default DetailPage;