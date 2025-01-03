import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CardCast from './card-cast';
import '../stylesheets/cards/cast.css';
import { useTheme } from '../../../contexts/themeProvider/index';
import { fetchMovieCredits } from '../../../tmdb/config';
import { useLanguage } from '../../../contexts/languageProvider/index.jsx';


const Cast = (props) => {

  const { theme } = useTheme();
  const { language, languageName } = useLanguage();

  // state to keep the cast members
  const [cast, setCast] = useState([]);

  //useeffect to make load the actors when the app start to render
  useEffect(() => {
      const loadCredits = async () => {
      const credits = await fetchMovieCredits(props.movieId, languageName);
      setCast(credits);
  };

    loadCredits();
  }, [props.movieId, languageName]);
  
  return (
    <div className='card-cast-main'
        style={{
            background: theme.details.cast.background,
        }}
    >
        <h1 className='title-cast'
          style={{
            color: theme.details.cast.title,
          }}
        >{language.details.cast}
        </h1>
        <div className='cards'
        style={{
            background: theme.details.cast.background,
        }}
        >
            <Grid
                container
                spacing={2}
                sx={{flexWrap: 'nowrap'}}
            >
            {cast.map((cast, index) => (
                <Grid
                    item
                    key={index}
                >
                <CardCast real_name={cast.name} name={cast.character} image={cast.profilePath}/>
            </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Cast