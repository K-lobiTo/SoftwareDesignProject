import MovieList from "../MovieList";
import { useAuth } from "../../../contexts/authContext";
import { getMovieById } from "../../../tmdb/config";
import { useEffect } from "react";

const Watchlist = () => {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  // I need a useEffect to get the movies from the user, fetch them from the API then put them in 'movies' and loading them to the UI

  useEffect(() => {
    if (!currentUser || !currentUser.movies) return; // Just in case

    const fetchMovies = async () => {
      try {
        const moviePromises = currentUser.movies.map((movieId) => {
        getMovieById(movieId);
        });
        const results = await Promise.all(moviePromises);
        setMovies(results);
        
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [currentUser]);

  return (
    <div>
      <h1>{`${currentUser.displayName} Watchlist`}</h1>

      <MovieList movies={movies}></MovieList>
    </div>
  );
};


export default Watchlist
