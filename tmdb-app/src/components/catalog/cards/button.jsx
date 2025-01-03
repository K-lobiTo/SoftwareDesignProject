import React from 'react';
import { CheckCircleOutline } from '@mui/icons-material';

const CustomIconButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <CheckCircleOutline sx={{ fontSize: 40, color: '#6A4C9C' }} />
    </button>
  );
};

export default CustomIconButton;
