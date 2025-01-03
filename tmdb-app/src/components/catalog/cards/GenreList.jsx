import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useTheme } from '../../../contexts/themeProvider/index';
import { useLanguage } from '../../../contexts/languageProvider/index';


const GenreList = (props) => {

  const { theme } = useTheme();
  const { language } = useLanguage();

  const { genres, selectedGenre, handleFilterChange } = props;

  return (
    <Box 
      visibility={props.visibility ? 'visible' : 'hidden'}
      sx={{ 
        minWidth: props.visibility ? 120 : '0px', 
        padding: props.visibility?'24px 10px' : '0px', 
      }}>
      <TextField
        id="outlined-select-genre"
        select
        label={language.catalog.genre}
        value={selectedGenre}
        onChange={(e) => handleFilterChange(e.target.value)}
        fullWidth={true}
        sx={{
          maxWidth: '500px',
          minWidth: '150px',
          backgroundColor: theme.catalog.genreListBackground,
          borderRadius: '50px',
          fontSize: '16px',
          '& .MuiInputLabel-root': {
            color: theme.catalog.genreListTitleColor,
          },
          '& label.Mui-focused': {
            color: theme.catalog.genreListTitleColor, 
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: theme.catalog.genreListBackground,
            borderRadius: '50px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.catalog.borderFilterColor,
              borderRadius: '50px',
            },
            '&:hover fieldset': {
              borderColor: theme.catalog.borderFilterColor,
              borderRadius: '50px',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.catalog.borderFilterColor,
              borderRadius: '50px',
            },
            '& .MuiSelect-icon': {
              color: theme.catalog.genreListButtonColor, 
            },
            '& .MuiInputBase-input': {
              fontSize: '16px',
              color: theme.catalog.genreListLetterColor,
            },
            '& .MuiInputLabel-root': {
              color: theme.catalog.genreListLetterColor,
              backgroundColor: theme.catalog.genreListBackground,
            },
          },
        }}
      >
        <MenuItem value=""
          sx={{
            color: '#706A74',
            fontSize: '15px',
          }}
        >
          {language.catalog.allGenres}
        </MenuItem>
        
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}
          sx={{
            color: '#706A74',
            fontSize: '15px',
            backgroundColor: theme.catalog.backgroundColor,
          }}
          >
            {genre.name}
            
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default GenreList;
