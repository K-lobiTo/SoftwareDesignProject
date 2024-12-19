import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

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
import AdbIcon from "@mui/icons-material/Adb";

const unLoggedPages = ["login", "register"];
const loggedPages = ["catalog", "whatchlist"];
const settings = ["Sign Out"];

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    if (page === "login") {
      toLogin();
    } else if (page === "register") {
      toRegister();
    } else {
      // Ensure `page` is a string path if you intend to navigate to it
      console.log("Navigating to:", page);
      navigate(`/${page}`);
    }
  };

  // const toPage = async (page) => {
  //   if (page === "login" || page === "register") {
  //     await doSignOut();
  //   }
  //   navigate({ page });
  // };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TMDB-APP
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
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {userLoggedIn ? ( // IF USER IS LOGGED IN:
            <>
              {/* EXPANDED NAVBAR */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {loggedPages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => toPage(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              {/* COMPACTED NAVBAR */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
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
                      <Typography sx={{ textAlign: "center" }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser.email}
                      src={currentUser.photoURL}
                    />
                  </IconButton>
                </Tooltip>
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
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            // IF USER IS NOT LOGGED IN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            <>
              {/* EXPANDED NAVBAR */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {unLoggedPages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => toPage(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              {/* COMPACTED NAVBAR */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
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
                    // <MenuItem key={page} onClick={page=='Register'? toRegister : toLogin}>
                    <MenuItem key={page} onClick={() => toPage(page)}>
                      <Typography sx={{ textAlign: "center" }}>
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

// component={Link}
// to={`/${page}`}
