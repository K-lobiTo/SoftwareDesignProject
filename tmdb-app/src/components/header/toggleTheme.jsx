import styled from 'styled-components';
import { MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from '../../contexts/themeProvider/index.jsx';
import { useEffect, useState } from 'react';

const StyledLabel = styled.label`
  input {
    position: fixed;
    left: -9999999px;
  }
  input ~ div {
    width: 80px;
    height: 40px;
    background-color: #eee;
    border-radius: 20px;
    position: relative;
  }
  svg {
    height: 36px;
    color: #fff;
    background-color: #ccc;
    border-radius: 20px;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: all .4s ease;
  }
  input:checked ~ div {
    background-color: #668;
    svg {
      background-color: #224;
      left: 42px;
    }
  }
`;

function ToggleTheme() {

  const { themeName, toggleTheme } = useTheme();

  return (
    <StyledLabel>
      <input type="checkbox" checked={
        themeName === 'dark' ? true : false
      } onChange={toggleTheme} />
      <div>
        {
        <MoonIcon />
        }
      </div>
    </StyledLabel>
  );
}

export default ToggleTheme;