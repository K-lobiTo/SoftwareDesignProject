import React, {createContext, useContext, useState} from "react";

const FilterContext = createContext();

function FilterProvider(props) {
  const [gender, setGender] = useState('');
  const [movieName, setMovieName] = useState('');

  const selectGender = (genderId) => {
    setMovieName('');
    setGender(genderId);
    console.log("Gender: " + genderId);
  };

  const selectMovieName = (movieName) => {
    setGender('');
    setMovieName(movieName);
    console.log("Movie Name: " + movieName);
    console.log("Gender: " + genderId);
  };

  const value = { gender , selectGender, movieName, selectMovieName };

  return (
    <FilterContext.Provider value={value} {...props} />
  );
}

const useFilter = () => useContext(FilterContext);

/// @vite-ignore
export { FilterProvider as default, useFilter };