import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "92d41915c8b82a1b47b517889544058c";
// const API_KEY = import.meta.env.REACT_APP_API;

// Create an axios instance
export const tmdb = axios.create({
  baseURL: URL,
  params: {
    api_key: API_KEY,
  },
});
// console.log("API Key:", API_KEY);

// Response to search/movie by query (movie name)
export const searchMovies = async (query, language = "en-US", page = 1) => {
  try {
    const response = await tmdb.get("/search/movie", {
      params: {
        api_key: API_KEY,
        query,
        language,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};


// Fetch a specific movie by ID
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
