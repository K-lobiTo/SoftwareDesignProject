import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Importamos useParams y useLocation
import './stylesheets/detail-page.css';
import DetailPage from './detail-page';

function Details() {
  const { movieId, lenguage } = useParams();  // Obtenemos movieId desde los parámetros de la URL
  const location = useLocation(); // Obtenemos el estado pasado
  const languageFromState = location.state?.lenguage || 'en-US';
  const language = lenguage || languageFromState;

  return (
    <DetailPage movieId={movieId} lenguage={language} />
  );
}

export default Details;
