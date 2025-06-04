import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "92d41915c8b82a1b47b517889544058c";

export const config = {
    apiKey: API_KEY,
    baseURL: URL
};

export const tmdb = axios.create({
    baseURL: URL,
    params: {
        api_key: API_KEY,
    },
});

export const searchMovies = async (query, language, page, genderId) => {
    try {
        const response = await tmdb.get("/search/movie", {
            params: {
                api_key: API_KEY,
                query: query,
                language,
                page,
            },
        });

        if (query === "" && genderId === "") {
            const all_movies = await getAllMovies(language, page);
            return all_movies;
        }

        const movies = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release: movie.release_date,
            punctuation: movie.vote_average,
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));

        return [movies, response.data.total_pages];
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const getGenres = async (language) => {
    try {
        const response = await tmdb.get("/genre/movie/list", {
            params: {
                api_key: API_KEY,
                language: language,
            },
        });
        return response.data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
};

export const getMovieById = async (movieId, language) => {
    try {
        const response = await axios.get(`${URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY,
                language,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw error;
    }
};

export const getMoviesByGenre = async (genreId, language, page) => {
    try {
        const response = await tmdb.get("/discover/movie", {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                language,
                page,
            },
        });

        const movies = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release: movie.release_date,
            punctuation: movie.vote_average,
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));

        var total_pages = response.data.total_pages;

        if (total_pages >= 500) {
            total_pages = 500;
        }

        return [movies, total_pages];
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
        throw error;
    }
};

// function to get movies
export const getAllMovies = async (language, page) => {
    try {
        const response = await tmdb.get("/discover/movie", {
            params: {
                api_key: API_KEY,
                language,
                page,
            },
        });

        const movies = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release: movie.release_date,
            punctuation: movie.vote_average,
            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));

        var total_pages = response.data.total_pages;

        if (total_pages >= 500) {
            total_pages = 500;
        }

        return [movies, total_pages];
    } catch (error) {
        console.error("Error fetching all movies:", error);
        throw error;
    }
};

// TAMARA
// function to get all the actors members of the movie ID
export const fetchMovieCredits = async (movieId, language) => {
    try {
        const response = await tmdb.get(`/movie/${movieId}/credits`, {
            params: {
                language,
            },
        });

        const cast = response.data.cast
            .filter((member) => member.known_for_department === "Acting")
            .map((member) => ({
                id: member.id,
                name: member.name,
                character: member.character,
                profilePath: member.profile_path
                    ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                    : "https://i.imgflip.com/9au02y.jpg?a482136",
            }));

        return cast; // Devuelve el elenco
    } catch (error) {
        console.error("Failed to fetch movie credits:", error);
        return [];
    }
};

export async function fetchMovieVideos(movieId, language) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

    try {
        const response = await tmdb.get(url, {
            params: {
                language,
            },
        });

        const youtubeVideos = response.data.results.filter(
            (video) => video.site === "YouTube",
        );
        return youtubeVideos;
    } catch (error) {
        console.error("Error fetching movie videos:", error);
        return [];
    }
}

// function to get the movie data
export const fetchMovieData = async (movieId, language) => {
    try {
        const response = await tmdb.get(`/movie/${movieId}`, {
            params: {
                language,
            },
        });

        const data = response.data;
        return data;
    } catch (error) {
        console.error(
            "Error al obtener los datos de la película:",
            error.message,
        );
        throw error;
    }
};
