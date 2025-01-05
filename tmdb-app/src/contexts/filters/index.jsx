import React, {createContext, useContext, useState} from "react";

const FilterContext = createContext();

function FilterProvider(props) {
  const [gender, setGender] = useState('');
  const [movieName, setMovieName] = useState('');
  const [page, setPage] = useState('catalog');

  const selectGender = (genderId) => {
    setMovieName('');
    setGender(genderId);
  };

  const selectMovieName = (movieName) => {
    setGender('');
    setMovieName(movieName);
  };

  const selectPage = (page) => {
    setPage(page);
  };

  const value = { gender , selectGender, movieName, selectMovieName, selectPage, page };

  return (
    <FilterContext.Provider value={value} {...props} />
  );
}

const useFilter = () => useContext(FilterContext);

/// @vite-ignore
export { FilterProvider as default, useFilter };