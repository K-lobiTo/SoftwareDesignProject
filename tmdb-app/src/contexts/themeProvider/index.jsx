import React, {createContext, useContext, useState} from "react";

const themeStyles = {
  light: {

    watchlist: {
      // Contenedor principal
      background: '#D5C6DB',
      titleColor: '#572974',
      
      // Tabla de películas
      tableBackground: '#D5C6DB',
      tableHeaderColor: '#572974',
      tableBorder: '1px solid #D5C6DB',
      tableRowColor: '#572974',
      
 
      // Tarjetas de película
      cardBackground: '#D5C6DB',
      cardBorder: '1px solid #D5C6DB',
      cardTitleColor: '#572974',
      cardTextColor: '#706A74',
      
      // Acciones y botones
      buttonBackground: '#D5C6DB',
      buttonColor: '#1C003A',
      buttonHoverBg: '#825C97',
      buttonHoverColor: '#fff',
      deleteIconColor: '#1C003A',
      deleteIconHoverColor: '#825C97',
      
      // Campo de búsqueda
      searchBackground: '#fff',
      searchTextColor: '#706A74',
      searchBorder: '1px solid #D5C6DB',
      searchPlaceholderColor: '#706A74',
      
      // Estados de carga y mensajes
      loadingTextColor: '#572974',
      emptyStateColor: '#706A74',
      errorTextColor: '#FF0000'
    },

    catalog:{
      // Cards area
      background: '#D5C6DB',
      titleColor: '#572974',
      cardBackground: '#fff',
      movieNameColor: '#1C003A',
      iconColor: '#1C003A',
      detailsColor: '#706A74', 
      cardBorder: '1px solid #e0e0e0',

      // Card On Hover
      onHoverBackground: '#825C97',
      onHoverBorderColor: '1px solid #b9b0c2',
      detailsColorOnHover: '#fff',
      movieNameColorOnHover: '#D5C6DB',

      // SearchArea
      searchAreaBackground: '#fff',
      searchAreaLetterColor: '#706A74',
      borderSearchColor: 'transparent',
      searchButtonColor: '#543F6B',
      searchTitleColor: '#543F6B',

      // GenreList
      genreListBackground: '#fff',
      genreListLetterColor: '#706A74',
      borderFilterColor: '#fff',
      genreListButtonColor: '#543F6B',
      genreListTitleColor: '#543F6B',
      boxBorderColor: '#D5C6DB',

      // Pagination
      paginationBackground: 'transparent',
      paginationNumberColor: '#572974',
      paginationBackgroundSelect: '#572974',
      paginationNumberColorSelect: '#fff',
    },

    details:{

      button:{
        background: '#D5C6DB',
        color: '#1C003A',
      },

      cardTitle:{
        background: '#AB90B9',
        cardTitleColor: '#572974',
        cardDateColor: '#1C003A',
        cardGenderColor: '#fff',
        titlePunctuationColor: '#fff',
        percentajeColor: '#1C003A',
        circularProgressColor: '#572974',
        iconColor: '#1C003A',
        sipnosisColor: '#fff',
        descriptionColor: '#1C003A',
      },

      cardInfo:{
        background: '#D5C6DB',
        colorTitle: '#825C97',
        colorText: '#572974',
      },

      cast:{
        background: '#572974',
        title: '#fff',
      },

      videos:{
        background: '#572974',
        title: '#fff',
        text: '#fff',
      },

      images:{
        background: '#572974',
        title: '#fff',
      },

      cardCast:{
        background: '#fff',
        border: '1px solid #e0e0e0;',
        name: '#825C97',
        realName: '#572974',
      }

    },

    background: '#000',
  },
  
  dark: {


    watchlist: {
      // Contenedor principal
      background: '#1C003A',
      titleColor: '#fff',
      
      // Tabla de películas
      tableBackground: '#1C003A',
      tableHeaderColor: '#fff',
      tableBorder: '1px solidrgb(196, 179, 206)',
      tableRowColor: '#D5C6DB',
      
      // Tarjetas de película
      cardBackground: '#1C003A',
      cardBorder: '1px solid #1C003A',
      cardTitleColor: '#D5C6DB',
      cardTextColor: '#fff',
      
      // Acciones y botones
      buttonBackground: '#D5C6DB',
      buttonColor: '#1C003A',
      buttonHoverBg: '#825C97',
      buttonHoverColor: '#D5C6DB',
      deleteIconColor: '#D5C6DB',
      deleteIconHoverColor: '#fff',
      
      // Campo de búsqueda
      searchBackground: '#370B5E',
      searchTextColor: '#FFFFFF',
      searchBorder: '1px solid #D5C6DB',
      searchPlaceholderColor: '#825C97',
      
      // Estados de carga y mensajes
      loadingTextColor: '#D5C6DB',
      emptyStateColor: '#825C97',
      errorTextColor: '#FF6B6B'
    },

    catalog:{
      // Cards area
      background: '#1C003A',
      titleColor: '#fff',
      cardBackground: '#825C97',
      movieNameColor: '#D5C6DB',
      iconColor: '#D5C6DB',
      detailsColor: '#FFFFFF', 
      cardBorder: '1px solid #5e2c79',

      // Card On Hover
      onHoverBackground: '#D5C6DB',
      onHoverBorderColor: '1px solid #c7bfcc',
      detailsColorOnHover: '#fff',
      movieNameColorOnHover: '#572974',

      // SearchArea
      searchAreaBackground: 'transparent',
      searchAreaLetterColor: '#D5C6DB',
      borderSearchColor: 'transparent',
      searchButtonColor: '#D5C6DB',
      searchTitleColor: '#FFF',
      boxBorderColor: '#D5C6DB',

      // GenreList
      genreListBackground: 'transparent',
      genreListLetterColor: '#fff',
      borderFilterColor: '#D5C6DB',
      genreListButtonColor: '#D5C6DB',
      genreListTitleColor: '#fff',

      // Pagination
      paginationBackground: 'transparent',
      paginationNumberColor: '#fff',
      paginationBackgroundSelect: '#D5C6DB',
      paginationNumberColorSelect: '#825C97',
    }, 

    details:{

      button:{
        background: '#D5C6DB',
        color: '#1C003A',
      },

      cardTitle:{
        background: '#370B5E',
        cardTitleColor: '#AB90B9',
        cardDateColor: '#fff',
        cardGenderColor: '#D5C6DB',
        titlePunctuationColor: '#D5C6DB',
        percentajeColor: '#D5C6DB',
        circularProgressColor: '#fff',
        iconColor: '#D5C6DB',
        sipnosisColor: '#D5C6DB',
        descriptionColor: '#fff',
      },

      cardInfo:{
        background: '#825C97',
        colorTitle: '#fff',
        colorText: '#D5C6DB',
      },

      cast:{
        background: '#1C003A',
        title: '#fff',
      },

      videos:{
        background: '#1C003A',
        title: '#fff',
        text: '#fff',
      },

      images:{
        background: '#1C003A',
        title: '#fff',
      },

      cardCast:{
        background: '#825C97',
        border: '1px solid #a17eb4',
        name: '#fff',
        realName: '#1C003A',
      }

    },

    background: '#D5C6DB',
    color: '#f5f5f5',
  },
};



const ThemeContext = createContext();

function ThemeProvider(props) {
const [theme, setTheme] = useState('dark');
const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

const value = { theme: themeStyles[theme], toggleTheme };

return (
  <ThemeContext.Provider value={value} {...props} />
);    
}

const useTheme = () => useContext(ThemeContext);

/// @vite-ignore
export { ThemeProvider as default, useTheme };