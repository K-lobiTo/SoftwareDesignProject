
import React from "react";

import { AuthProvider } from "./contexts/authContext/index";
import { useRoutes } from "react-router-dom";
import Home from './components/for_testing';
import Header from './components/header';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Catalog from './components/catalog/Catalog';
import Details from './components/details/Details';
import Watchlist from './components/watchlist/Watchlist';

// Context
import ThemeProvider from './contexts/themeProvider';
import FilterProvider from './contexts/filters/index';
import LanguageProvider from './contexts/languageProvider/index';


import './App.css'
import 'materialize-css/dist/css/materialize.min.css'

function App() {

  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/catalog",
      element: <Catalog />,
    },
    {
      path: "/details/:movieId",
      element: <Details />,
    },
    {
      path: "/watchlist",
      element: <Watchlist />,
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <FilterProvider>
            <Header />
            <div className="w-full h-screen flex flex-col">{routesElement}</div>
          </FilterProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );

}
export default App
