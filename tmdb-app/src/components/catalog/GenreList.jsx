import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const GenreList = ({ genres, selectedGenre, handleFilterChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="genre-select">
        </InputLabel>
        <NativeSelect
          value={selectedGenre}
          onChange={(e) => handleFilterChange(e.target.value)}
          inputProps={{
            name: 'genre',
            id: 'genre-select',
          }}
        >
          <option value="">Todos los Géneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default GenreList;