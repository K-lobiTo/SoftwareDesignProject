import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { AuthProvider } from "./contexts/authContext/index";
import { useRoutes } from "react-router-dom";
import Home from './components/for_testing';
import Header from './components/header';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Catalog from './components/catalog/Catalog';


import './App.css'
import 'materialize-css/dist/css/materialize.min.css'
import Watchlist from './components/catalog/watchlist/Watchlist';

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
      path: "/watchlist",
      element: <Watchlist />,
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  )
}

export default App
