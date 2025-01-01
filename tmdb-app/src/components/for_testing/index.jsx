import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { getMoviesByUser } from "../../firebase/firestore";

const Home = () => {
  const { currentUser } = useAuth();
  const [ movieList, setMovieList ] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const usrMovies = await getMoviesByUser(currentUser);
        setMovieList(usrMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <>
      <div className="text-2xl font-bold pt-14">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
    </>
  );
};
export default Home;
