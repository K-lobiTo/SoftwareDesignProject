import React, { useEffect, useState } from 'react';
import '../stylesheets/cards/videos.css';
import { fetchMovieVideos } from '../../../tmdb/config';
import { useTheme } from '../../../contexts/themeProvider/index.jsx';
import { useLanguage } from '../../../contexts/languageProvider/index.jsx';
import { Box } from "@mui/material";


function Videos(props) {
  const { languageName } = useLanguage();
  const { theme } = useTheme();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const youtubeVideos = await fetchMovieVideos(props.movieId);
      setVideos(youtubeVideos);
    }
    fetchVideos();
  },[props.movieId, languageName]);

  return (
    <Box className="card-video-main"
      style={{
        backgroundColor: theme.details.videos.background,
      }}
    >
      <h1 className="title"
        style={{
          color: theme.details.videos.title,
        }}
      >Videos</h1>
      <Box className="video-list">
        {videos.map(video => (
          <Box className="video-item" key={video.key}>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.name}
              className="video-iframe"
            />
            <p className="video-title"
              style={{
                color: theme.details.videos.text,
              }}
            >{video.name}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Videos;
