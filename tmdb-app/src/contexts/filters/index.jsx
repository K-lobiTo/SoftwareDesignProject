import React, {createContext, useContext, useState} from "react";

const FilterContext = createContext();

function FilterProvider(props) {
  const [gender, setGender] = useState('');
  const [movieName, setMovieName] = useState('');
  const [numberPage, setNumberPage] = useState(1);
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

  const selectNumberPage = (num) => {
    setNumberPage(num);
  }

  const reset = () => {
    setGender('');
    setMovieName('');
    setNumberPage(1);
  };

  const value = { gender , selectGender, movieName, selectMovieName, selectPage, page, selectNumberPage, numberPage, reset };

  return (
    <FilterContext.Provider value={value} {...props} />
  );
}

const useFilter = () => useContext(FilterContext);

/// @vite-ignore
export { FilterProvider as default, useFilter };