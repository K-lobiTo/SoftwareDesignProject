import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useTheme } from '../../../contexts/themeProvider/index';
import { useLanguage } from '../../../contexts/languageProvider/index';

const SearchArea = (props) => {

  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <Box 
      visibility={props.enabled ? 'hidden' : 'visible'}
      sx={{ 
        minWidth: props.enabled ? "0px" : "400px", 
        maxWidth: props.enabled ? "0px" : "1000px", 
        margin: '24px 20px',
        border: '1px solid',
        borderColor: theme.catalog.boxBorderColor,
        borderRadius: '50px',
      }}
    >
      <form onSubmit={e => {
        e.preventDefault();
        props.handleSubmit(e);
      }}>
        <TextField
          id="outlined-search"
          label={language.catalog.search}
          onChange={props.handleChange}
          fullWidth={true}
          value={props.query}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={e => {
                    e.preventDefault();
                    props.handleSubmit(e);
                  }}
                  edge="end"
                >
                  <SearchIcon sx={{ color: theme.catalog.searchButtonColor }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            paddingLeft: '20px',
            paddingRight: '20px',
            maxWidth: '1000px',
            minWidth: '40vw',
            backgroundColor: theme.catalog.searchAreaBackground,
            borderRadius: '50px',
            fontSize: '16px',
            '& .MuiInputLabel-root': {
              color: theme.catalog.searchTitleColor,
            },
            '& label.Mui-focused': {
              color: theme.catalog.searchFocusedColor, 
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: theme.catalog.searchAreaBackground,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.catalog.borderSearchColor,
                borderRadius: '50px',
              },
              '&:hover fieldset': {
                borderColor: theme.catalog.borderSearchColor,
                borderRadius: '50px',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.catalog.borderSearchColor,
                borderRadius: '50px',
              },
              '& .MuiSelect-icon': {
                color: theme.catalog.searchButtonColor, 
              },
              '& .MuiInputBase-input': {
                fontSize: '16px',
                color: theme.catalog.searchAreaLetterColor,
              },
              '& .MuiInputLabel-root': {
                color: theme.catalog.searchTitleColor,
              },
            },
          }}
        />
      </form>
    </Box>
  );
};

export default SearchArea;
