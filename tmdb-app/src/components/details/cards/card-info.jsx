import React, { useEffect, useState } from 'react';
import '../stylesheets/cards/card-info.css';
import { useTheme } from '../../../contexts/themeProvider/index';
import { fetchMovieData } from '../../../tmdb/config';
import { useLanguage } from '../../../contexts/languageProvider/index.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CardInfo = (props) => {
  const { theme } = useTheme();
  const { language, languageName } = useLanguage();

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Llamar a la función para cargar los datos de la película
  useEffect(() => {
    async function fetchMovieInfo() {
      setLoading(true);
      const movieData = await fetchMovieData(props.movieId, languageName);
      setMovieData(movieData);
      setLoading(false);
    }
    fetchMovieInfo();
  }, [props.movieId, languageName]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  return (
    <Box
      className="card-info"
      style={{
        background: theme.details.cardInfo.background,
      }}
    >
      <Box className="text">
        <h1
          className="original-title"
          style={{
            color: theme.details.cardInfo.colorTitle,
          }}
        >
          {language.details.originalTitle}
        </h1>
        <p
          className="original-title-text"
          style={{
            color: theme.details.cardInfo.colorText,
          }}
        >
          {movieData.original_title}
        </p>

        <h1
          className="productor"
          style={{
            color: theme.details.cardInfo.colorTitle,
          }}
        >
          {language.details.production}
        </h1>
        <p
          className="productor-text"
          style={{
            color: theme.details.cardInfo.colorText,
          }}
        >
          {movieData.production_companies?.map((company, index) => (
            <React.Fragment key={index}>
              {company.name}
              {index < movieData.production_companies.length - 1 && (
                <>
                  <br />
                </>
              )}
            </React.Fragment>
          )) || `${language.details.undefined}`}
        </p>

        <h1
          className="runtime"
          style={{
            color: theme.details.cardInfo.colorTitle,
          }}
        >
          {language.details.runtime}
        </h1>
        <p
          className="runtime-text"
          style={{
            color: theme.details.cardInfo.colorText,
          }}
        >
          {movieData.runtime
            ? `${movieData.runtime} ${language.details.minutes}`
            : language.details.undefined}
        </p>

        <h1
          className="lenguage"
          style={{
            color: theme.details.cardInfo.colorTitle,
          }}
        >
          {language.details.language}
        </h1>
        <p
          className="lenguage-text"
          style={{
            color: theme.details.cardInfo.colorText,
          }}
        >
          {movieData.spoken_languages?.map((lang, index) => (
            <React.Fragment key={index}>
              {lang.name}
              {index < movieData.spoken_languages.length - 1 && (
                <>
                  <br />
                </>
              )}
            </React.Fragment>
          )) || `${language.details.undefined}`}
        </p>

        <h1
          className="budget"
          style={{
            color: theme.details.cardInfo.colorTitle,
          }}
        >
          {language.details.budget}
        </h1>
        <p
          className="budget-text"
          style={{
            color: theme.details.cardInfo.colorText,
          }}
        >
          ${movieData.budget.toLocaleString()}
        </p>

        <h1
          className="revenue"
          style={{
            color: theme.details.cardInfo.colorTitle,
          }}
        >
          {language.details.revenue}
        </h1>
        <p
          className="revenue-text"
          style={{
            color: theme.details.cardInfo.colorText,
          }}
        >
          ${movieData.revenue.toLocaleString()}
        </p>
      </Box>
    </Box>
  );
};

export default CardInfo;
