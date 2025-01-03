import React, {createContext, useContext, useState} from "react";

const languageNames={
  'en-US': {

    header:{
        catalog: 'Catalog',
        watchList: 'Watch List',
        config: 'Configuration',
        signOut: 'Sign Out',

        // CONFIGURATION
        language: 'Language',
        theme: 'Theme Color: ',
        spanish: 'Spanish',
        english: 'English',
        light: 'Light',
        dark: 'Dark',
    },

    catalog:{
      catalog: 'Catalog',

      // MOVIE CARD
      punctuation: 'Punctuation: ',
      releaseDate: 'Release: ',

      // SEARCH BAR
      search: 'Search by title',
      genre: 'Genres',
      allGenres: 'All Genres',
    },

    details:{
      // Card Title
      punctuation: 'Punctuation:',
      overView: 'Overview:',

      // Details
      cast: 'Cast',
      images: 'Images',
      notImages: 'No images available',

      // Card Info
      originalTitle: 'Original Title:',
      production: 'Production Company:',
      runtime: 'Runtime:',
      minutes: 'minutes',
      language: 'Language:',
      budget: 'Budget:',
      revenue: 'Revenue:',
      undefined: 'Unknown',
    }

  },
  'es-MX': {
    header:{
        catalog: 'Catálogo',
        watchList: 'Lista de Reproducción',
        config: 'Configuración',
        signOut: 'Salir',

        // CONFIGURATION
        language: 'Idioma',
        theme: 'Color del Tema: ',
        spanish: 'Español',
        english: 'Inglés',
        light: 'Claro',
        dark: 'Oscuro',
    },

    catalog:{
      catalog: 'Catálogo',

      // MOVIE CARD
      punctuation: 'Puntuación: ',
      releaseDate: 'Estreno: ',

      // SEARCH BAR
      search: 'Buscar por título',
      genre: 'Géneros',
      allGenres: 'Todos los Géneros',
    },

    details:{
      // Card Title
      punctuation: 'Puntuación:',
      overView: 'Resumen:',

      // Details
      cast: 'Reparto',
      images: 'Imágenes',
      notImages: 'No hay imágenes disponibles',

      // Card Info
      originalTitle: 'Título Original:',
      production: 'Productora:',
      runtime: 'Duración:',
      minutes: 'minutos',
      language: 'Idioma:',
      budget: 'Presupuesto:',
      revenue: 'Ingresos:',
      undefined: 'Desconocido',
    },
  },
};


const LanguageContext = createContext();

function LanguageProvider(props) {
const [language, setLanguage] = useState('en-US');
const toggleLanguage = () => {
  setLanguage(language === 'en-US' ? 'es-MX' : 'en-US');
};

const value = { language: languageNames[language], toggleLanguage, languageName: language };

return (
  <LanguageContext.Provider value={value} {...props} />
);    
}

const useLanguage = () => useContext(LanguageContext);

/// @vite-ignore
export { LanguageProvider as default, useLanguage };