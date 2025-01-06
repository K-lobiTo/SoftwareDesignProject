import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';


import { useLanguage } from "../../contexts/languageProvider";
import SettingsDialog from '../../contexts/languageProvider/SettingsDialog';
import { useState } from 'react';

import { useTheme } from '../../contexts/themeProvider/index';
import { useFilter } from '../../contexts/filters/index';


const unLoggedPages = ["login", "register"];
const loggedPages = ["catalog", "watchList"];
const settings = ["Sign Out"];

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { language, toggleLanguage, languageName } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState('en'); 
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);

  const { movieName, reset } = useFilter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toLogin = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
  };

  const toRegister = () => {
    doSignOut().then(() => {
      navigate("/register");
    });
  };
  const toPage = (page) => {

    reset();

    if (page === "login") {
      toLogin();
    } else if (page === "register") {
      toRegister();
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieFilterIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "purple" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "purple",
              textDecoration: "none",
            }}
          >
            {language.appName}
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "purple",
              textDecoration: "none",
            }}
          >
            {language.appName}
            </Typography>
          {userLoggedIn ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {loggedPages.map((page) => (
                  <Typography
                    key={page}
                    onClick={() => toPage(page)}
                    sx={{ my: 2, color: "purple", display: "block", cursor: "pointer", fontFamily: "monospace", textTransform: "uppercase", mx: 1 }}
                  >
                    {language.header[page]}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: "purple" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {loggedPages.map((page) => (
                    <MenuItem key={page} onClick={() => toPage(page)}>
                      <Typography sx={{ textAlign: "center", color: "purple", fontFamily: "monospace", textTransform: "uppercase" }}>
                        {language.header[page]}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Tooltip title={language.header.config}>
              <IconButton 
                sx={{
                  p: 0,
                  mx: 1,
                  backgroundColor: 'transparent',
                  '&:hover': { backgroundColor: 'transparent' },
                  '&:active': { backgroundColor: 'transparent' },
                  '&:focus': { backgroundColor: 'transparent' },
                }}
                onClick={handleClickOpen} 
              >
                <SettingsSuggestIcon sx={{ fontSize: 45, color: '#A9A9A9' }} />
              </IconButton>
            </Tooltip>

            <SettingsDialog
              open={open} 
              handleClose={handleClose} 
            />
      <Tooltip title={language.header.signOut}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 1 }}>
          <Avatar
            alt={currentUser.email}
            src={currentUser.photoURL}
          />
        </IconButton>
      </Tooltip>
      <SettingsDialog
        open={openPopup}
        handleClose={handleClose}
        currentLanguage={currentLanguage}
        setLanguage={setCurrentLanguage}
      />
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={toLogin}>
                      <Typography sx={{ textAlign: "center", color: "purple", fontFamily: "monospace" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {unLoggedPages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => toPage(page)}
                    sx={{ my: 2, color: "purple", display: "block", fontFamily: "monospace" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Tooltip title={language.header.config}>
              <IconButton 
                sx={{
                  p: 0,
                  mx: 1,
                  backgroundColor: 'transparent',
                  '&:hover': { backgroundColor: 'transparent' },
                  '&:active': { backgroundColor: 'transparent' },
                  '&:focus': { backgroundColor: 'transparent' },
                }}
                onClick={handleClickOpen} 
              >
                <SettingsSuggestIcon sx={{ fontSize: 45, color: '#A9A9A9' }} />
              </IconButton>
            </Tooltip>

            <SettingsDialog
              open={open} 
              handleClose={handleClose} 
            />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: "purple" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {unLoggedPages.map((page) => (
                    <MenuItem key={page} onClick={() => toPage(page)}>
                      <Typography sx={{ textAlign: "center", color: "purple", fontFamily: "monospace" }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
