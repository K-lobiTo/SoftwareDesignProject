import React, { createContext, useContext, useState } from "react";

const themeStyles = {
  light: {
    watchlist: {

      rowBorderColor: '#572974',
      background: '#AB90B9',
      titleColor: '#572974',
      tableBackground: '#AB90B9',
      tableHeaderColor: '#572974',
      tableBorder: '1px solidrgb(87, 41, 116)',
      tableRowColor: '#572974',
      cardBackground: '#572974',
      cardBorder: '1px solid transparent',
      cardTitleColor: '#572974',
      cardTextColor: '#572974',
      buttonBackground: '#D5C6DB',
      buttonColor: '#1C003A',
      buttonHoverBg: '#825C97',
      buttonHoverColor: '#D5C6DB',
      deleteIconColor: '#D5C6DB',
      deleteIconHoverColor: '#fff',
      loadingTextColor: '#D5C6DB',
      emptyStateColor: '#825C97',
      errorTextColor: '#FF6B6B',
      

  
      search: {
        background: 'transparent',
        textColor: '#FFFFFF',
        placeholderColor: '#FFFFFF',
        iconColor: '#825C97',
        borderColor: 'transparent',
        hoverBorderColor: '#825C97',
        focusBorderColor: '#FFF',
        containerBackground: 'transparent',
        containerBorderColor: 'transparent',
        containerBorderRadius: '50px',
        inputBorderRadius: '25px',
        inputPadding: '10px 16px',
        containerPadding: '15px',
        inputWidth: '77vw',
        minContainerWidth: '400px',
        maxContainerWidth: '80vw',
        inputColor:"#825C97",
        backgroundSearch: "#fff",
      }
    },


    catalog:{
      // Cards area
      background: "#D5C6DB",
      titleColor: "#572974",
      cardBackground: "#fff",
      movieNameColor: "#1C003A",
      iconColor: "#1C003A",
      detailsColor: "#706A74",
      cardBorder: "1px solid #e0e0e0",

      // Card On Hover
      onHoverBackground: "#825C97",
      onHoverBorderColor: "1px solid #b9b0c2",
      detailsColorOnHover: "#fff",
      movieNameColorOnHover: "#D5C6DB",

      // SearchArea
      searchAreaBackground: "#fff",
      searchAreaLetterColor: "#706A74",
      borderSearchColor: "transparent",
      searchButtonColor: "#543F6B",
      searchTitleColor: "#543F6B",

      // GenreList
      genreListBackground: "#fff",
      genreListLetterColor: "#706A74",
      borderFilterColor: "#fff",
      genreListButtonColor: "#543F6B",
      genreListTitleColor: "#543F6B",
      boxBorderColor: "#D5C6DB",

      // Pagination
      paginationBackground: "transparent",
      paginationNumberColor: "#572974",
      paginationBackgroundSelect: "#572974",
      paginationNumberColorSelect: "#fff",
    },

    details: {
      button: {
        background: "#D5C6DB",
        color: "#1C003A",
      },

      cardTitle: {
        background: "#AB90B9",
        cardTitleColor: "#572974",
        cardDateColor: "#1C003A",
        cardGenderColor: "#fff",
        titlePunctuationColor: "#fff",
        percentajeColor: "#1C003A",
        circularProgressColor: "#572974",
        iconColor: "#1C003A",
        sipnosisColor: "#fff",
        descriptionColor: "#1C003A",
      },

      cardInfo: {
        background: "#D5C6DB",
        colorTitle: "#825C97",
        colorText: "#572974",
      },

      cast: {
        background: "#572974",
        title: "#fff",
      },

      videos: {
        background: "#572974",
        title: "#fff",
        text: "#fff",
      },

      images: {
        background: "#572974",
        title: "#fff",
      },

      cardCast: {
        background: "#fff",
        border: "1px solid #e0e0e0;",
        name: "#825C97",
        realName: "#572974",
      },
    },
    auth: {
      input: '#1C003A',
      text: "#1C003A",
      background: "#e0e0e0",
      button: {
        background: "#1C003A",
        color: "#D5C6DB",
      },
    },

    settings:{
      background: "#fff",
      iconColor: "#000",
      dividerColor: "#eee",
      buttonLine: "#000",
    },

    background: " #D5C6DB",
    
  },

  dark: {

    watchlist: {

      rowBorderColor: '#FFF',
      background: '#1C003A',
      titleColor: '#fff',
      tableBackground: '#1C003A',
      tableHeaderColor: '#fff',
      tableBorder: '1px solidrgb(196, 179, 206)',
      tableRowColor: '#D5C6DB',
      cardBackground: '#1C003A',
      cardBorder: '1px solid #1C003A',
      cardTitleColor: '#fff',
      cardTextColor: '#fff',
      buttonBackground: '#D5C6DB',
      buttonColor: '#1C003A',
      buttonHoverBg: '#825C97',
      buttonHoverColor: '#D5C6DB',
      deleteIconColor: '#D5C6DB',
      deleteIconHoverColor: '#fff',
      loadingTextColor: '#D5C6DB',
      emptyStateColor: '#825C97',
      errorTextColor: '#FF6B6B',

  
      search: {
        background: 'transparent',
        textColor: '#FFFFFF',
        placeholderColor: '#FFFFFF',
        iconColor: '#FFFFFF',
        borderColor: '#D5C6DB',
        hoverBorderColor: '#825C97',
        focusBorderColor: '#AB90B9',
        containerBackground: 'transparent',
        containerBorderColor: '#D5C6DB',
        containerBorderRadius: '50px',
        inputBorderRadius: '25px',
        inputPadding: '10px 16px',
        containerPadding: '15px',
        inputWidth: '77vw',
        minContainerWidth: '400px',
        maxContainerWidth: '80vw',
        inputColor:"#FFFFFF",
        backgroundSearch: "transparent",
      }
    },

    catalog:{
      // Cards area
      background: " #1C003A",
      titleColor: "#fff",
      cardBackground: "#825C97",
      movieNameColor: "#D5C6DB",
      iconColor: "#D5C6DB",
      detailsColor: "#FFFFFF",
      cardBorder: "1px solid #5e2c79",

      // Card On Hover
      onHoverBackground: "#D5C6DB",
      onHoverBorderColor: "1px solid #c7bfcc",
      detailsColorOnHover: "#fff",
      movieNameColorOnHover: "#572974",

      // SearchArea
      searchAreaBackground: "transparent",
      searchAreaLetterColor: "#D5C6DB",
      borderSearchColor: "transparent",
      searchButtonColor: "#D5C6DB",
      searchTitleColor: "#FFF",
      boxBorderColor: "#D5C6DB",

      // GenreList
      genreListBackground: "transparent",
      genreListLetterColor: "#fff",
      borderFilterColor: "#D5C6DB",
      genreListButtonColor: "#D5C6DB",
      genreListTitleColor: "#fff",

      // Pagination
      paginationBackground: "transparent",
      paginationNumberColor: "#fff",
      paginationBackgroundSelect: "#D5C6DB",
      paginationNumberColorSelect: "#825C97",
    },

    details: {
      button: {
        background: "#D5C6DB",
        color: "#1C003A",
      },

      cardTitle: {
        background: "#370B5E",
        cardTitleColor: "#AB90B9",
        cardDateColor: "#fff",
        cardGenderColor: "#D5C6DB",
        titlePunctuationColor: "#D5C6DB",
        percentajeColor: "#D5C6DB",
        circularProgressColor: "#fff",
        iconColor: "#D5C6DB",
        sipnosisColor: "#D5C6DB",
        descriptionColor: "#fff",
      },

      cardInfo: {
        background: "#825C97",
        colorTitle: "#fff",
        colorText: "#D5C6DB",
      },

      cast: {
        background: "#1C003A",
        title: "#fff",
      },

      videos: {
        background: "#1C003A",
        title: "#fff",
        text: "#fff",
      },

      images: {
        background: "#1C003A",
        title: "#fff",
      },

      cardCast: {
        background: "#825C97",
        border: "1px solid #a17eb4",
        name: "#fff",
        realName: "#1C003A",
      },
    },

    auth: {
      input: '#fff',
      text: "#D5C6DB",
      background: "rgb(17, 0, 36)",
      button: {
        background: "#D5C6DB",
        color: "#1C003A",
      },
    },

    settings:{
      background: "rgba(18, 18, 18, 1)",
      iconColor: "#fff",
      dividerColor: "#fff",
      buttonLine: "#fff",
    },

    background: "#1C003A",
    color: "#f5f5f5",
  },
};


const ThemeContext = createContext();

function ThemeProvider(props) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = { theme: themeStyles[theme], toggleTheme, themeName: theme };

  return <ThemeContext.Provider value={value} {...props} />;
}

const useTheme = () => useContext(ThemeContext);

/// @vite-ignore
export { ThemeProvider as default, useTheme };
