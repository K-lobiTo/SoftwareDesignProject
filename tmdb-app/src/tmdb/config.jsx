import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "92d41915c8b82a1b47b517889544058c";

export const tmdb = axios.create({
  baseURL: URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query, genreId = "", language = "en-US", page = 1) => {
  try {
    const response = await tmdb.get("/search/movie", {
      params: {
        api_key: API_KEY,
        query,
        language,
        page,
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdb.get("/genre/movie/list", {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// export const getAllMoviesByGenres = async (language = "en-US", page = 1) => {
//   try {
//     const genres = await getGenres();
//     const moviesByGenre = await Promise.all(
//       genres.map(async (genre) => {
//         const movies = await getMoviesByGenre(genre.id, language, page);
//         return { genre: genre.name, movies };
//       })
//     );
//     return moviesByGenre;
//   } catch (error) {
//     console.error("Error fetching movies by all genres:", error);
//     throw error;
//   }
// };
export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};
export const getMoviesByGenre = async (genreId, language = "en-US", page = 1) => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

export const getAllMovies = async (language = "en-US", page = 1) => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        api_key: API_KEY,
        language,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching all movies:", error);
    throw error;
  }
};
