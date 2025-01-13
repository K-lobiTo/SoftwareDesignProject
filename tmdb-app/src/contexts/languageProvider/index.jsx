import React, { createContext, useContext, useState } from "react";

const languageNames = {
  "en-US": {
    header: {
      catalog: "Catalog",
      watchList: "Watch List",
      config: "Configuration",
      signOut: "Sign Out",

      // CONFIGURATION
      language: "Language",
      theme: "Theme Color: ",
      spanish: "Spanish",
      english: "English",
      light: "Light",
      dark: "Dark",

      // unLoggedPages
      register: "Register",
      login: "Login",

      // LoggedPages
      catalogPage: "Catalog",
      watchlistPage: "WatchList",

    },

    catalog: {
      catalog: "Catalog",

      // MOVIE CARD
      punctuation: "Punctuation: ",
      releaseDate: "Release: ",

      // SEARCH BAR
      search: "Search by title",
      genre: "Genres",
      allGenres: "All Genres",
    },

    details: {
      // Card Title
      punctuation: "Punctuation:",
      overView: "Overview:",

      // Details
      cast: "Cast",
      images: "Images",
      notImages: "No images available",

      // Card Info
      originalTitle: "Original Title:",
      production: "Production Company:",
      runtime: "Runtime:",
      minutes: "minutes",
      language: "Language:",
      budget: "Budget:",
      revenue: "Revenue:",
      undefined: "Unknown",
    },
    watchlist: {
      title: "My Movie List",
      loading: "Loading your movies...",
      empty: "No movies in your watchlist",
      loginRequired: "Please login to see your watchlist",
      searchPlaceholder: "Search movie...",

      // Table Headers
      poster: "Poster",
      movieTitle: "Title",
      duration: "Duration",
      releaseDate: "Release Date",
      status: "Status",
      actions: "Actions",

      // Movie Status
      upcoming: "Upcoming",
      released: "Released",

      // Duration
      minutes: "min",
      notAvailable: "N/A",

      // Messages
      movieAdded: "Movie added to watchlist",
      movieRemoved: "Movie removed from watchlist",
    },

    auth: {
      //general
      email: "Email",
      password: "Password",
      //SignIn
      signIn: "Sign In",
      registerMsg: "Are you new here? Sign Up",
      googleAuthMsg: "Continue with Google",
      signingInMsg: "Signing In...",
      //SignUp
      signUp: "Sign Up",
      register: "Create Account",
      confirmPassword: "Confirm your password",
      signInMsg: "Already have an account?",

      passwordsDontMatch: "Passwords don't match",
      passwordTooShort: "Password must be at least 6 characters long",
      alrearInUse: "Email already in use",
      invalidCredentials: "Invalid credentials",
    },
    appName: "WatchList",
  },
  "es-MX": {
    header: {
      catalog: "Catálogo",
      watchList: "Lista de Reproducción",
      config: "Configuración",
      signOut: "Salir",

      // CONFIGURATION
      language: "Idioma",
      theme: "Color del Tema: ",
      spanish: "Español",
      english: "Inglés",
      light: "Claro",
      dark: "Oscuro",

      // unLoggedPages
      register: "Registro",
      login: "Inicio de Sesión",

      // LoggedPages
      catalogPage: "Catálogo",
      watchlistPage: "Mi Lista",

    },

    catalog: {
      catalog: "Catálogo",

      // MOVIE CARD
      punctuation: "Puntuación: ",
      releaseDate: "Estreno: ",

      // SEARCH BAR
      search: "Buscar por título",
      genre: "Géneros",
      allGenres: "Todos los Géneros",
    },

    watchlist: {
      title: "Mi Lista   ",
      loading: "Cargando tus películas...",
      empty: "No hay películas en tu watchlist",
      loginRequired: "Por favor inicia sesión para ver tu watchlist",
      searchPlaceholder: "Buscar película...",

      // Table Headers
      poster: "Poster",
      movieTitle: "Título",
      duration: "Duración",
      releaseDate: "Fecha de Estreno",
      status: "Estado",
      actions: "Acciones",

      // Movie Status
      upcoming: "Próximamente",
      released: "Estrenada",

      // Duration
      minutes: "min",
      notAvailable: "N/A",

      // Messages
      movieAdded: "Película agregada a la lista",
      movieRemoved: "Película eliminada de la lista",
    },

    details: {
      // Card Title
      punctuation: "Puntuación:",
      overView: "Resumen:",

      // Details
      cast: "Reparto",
      images: "Imágenes",
      notImages: "No hay imágenes disponibles",

      // Card Info
      originalTitle: "Título Original:",
      production: "Productora:",
      runtime: "Duración:",
      minutes: "minutos",
      language: "Idioma:",
      budget: "Presupuesto:",
      revenue: "Ingresos:",
      undefined: "Desconocido",
    },

    auth: {
      //general
      email: "Correo",
      password: "Contraseña",
      //SignIn
      signIn: "Inicia Sesión",
      registerMsg: "Eres nuevo aquí? Regístrate",
      googleAuthMsg: "Continuar con google",
      signingInMsg: "Iniciando sesión...",
      //SignUp
      signUp: "Crear Cuenta",
      register: "Registrarse",
      confirmPassword: "Confirmar contraseña",
      signInMsg: "Ya tienes una cuenta?",

      passwordsDontMatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
      alrearInUse: "Correo ya en uso",
      invalidCredentials: "Credenciales inválidas",
    },
    appName: "WatchList",
  },
};

const LanguageContext = createContext();

function LanguageProvider(props) {
  const [language, setLanguage] = useState("en-US");
  const toggleLanguage = () => {
    setLanguage(language === "en-US" ? "es-MX" : "en-US");
  };

  const value = {
    language: languageNames[language],
    toggleLanguage,
    languageName: language,
  };

  return <LanguageContext.Provider value={value} {...props} />;
}

const useLanguage = () => useContext(LanguageContext);

/// @vite-ignore
export { LanguageProvider as default, useLanguage };
