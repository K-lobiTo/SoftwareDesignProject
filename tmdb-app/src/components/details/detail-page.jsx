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


function DetailPage(props) {

  const { theme } = useTheme();

  const navigate = useNavigate();

  const [buttonPosition, setButtonPosition] = useState(100);

  const handleBack = () => {
    navigate(`/catalog`);
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
  
  return <div className='main'>
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

      <div className='details'>
        <div className='videos-cast'>

            <Cast movieId={props.movieId}
                lenguage={props.lenguage}
            />

            <Videos movieId={props.movieId}
                lenguage={props.lenguage}
            />
            <Images lenguage={props.lenguage}
              movieId={props.movieId}
            />
        </div>
        <CardInfo
          lg={props.lenguage}
          movieId={props.movieId}
        />
      </div>
      
    </div>
}

export default DetailPage;