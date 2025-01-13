import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import {
  Box,
  Container,
  Grid2,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import GoogleSignInButton from "../GoogleSignInButton";
import { useLanguage } from "../../../contexts/languageProvider";
import { useTheme } from "../../../contexts/themeProvider";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { language } = useLanguage();
  const { theme } = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage(""); 
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(language.auth.invalidCredentials);
      } finally {
        setIsSigningIn(false);
      }
    }
  };
  

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div
      className="login"
      style={{
        backgroundColor: theme.background,
        minHeight: "93.7vh",
        width: "100%",
      }}
    >
      {userLoggedIn && <Navigate to={"/catalog"} replace={true} />}
      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            marginTop: 16,
            marginBottom: 4,
            paddingBottom: 3,
            height: "650px",
            background: theme.auth.background,
          }}
        >
          <Stack
            spacing={0}
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid2
              item
              xs={6}
              md={3}
              p={4}
              sx={{
                boxSizing: "border-box",
                flex: 1,
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  mb: 3,
                  textAlign: "center",
                  fontFamily: "Shrikhand, sans-serif",
                  color: "#825c97",
                  textShadow: "-4px 4px 0px  rgba(0, 0, 0, 1)",
                }}
              >
                {language.appName}
              </Typography>
              <Typography
                component="h1"
                variant="h4"
                sx={{ mb: 3, textAlign: "center", color:theme.auth.text }}
              >
                {language.auth.signIn}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  onSubmit={onSubmit}
                  noValidate
                  sx={{ width: "100%" }}
                >
                  <Typography
                    component="h2"
                    variant="h6"
                    sx={{ mb: 1, color: theme.auth.text }}
                  >
                    {language.auth.email}
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ 
                      mb: 2, 
                      outlineColor: "red",
                      '& .MuiInputBase-input': {
                        color: theme.auth.input, 
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.auth.input, 
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                    }}
                  />
                  <Typography
                    component="h2"
                    variant="h6"
                    sx={{ mb: 1, color: theme.auth.text }}
                  >
                    {language.auth.password}
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3,
                      '& .MuiInputBase-input': {
                        color: theme.auth.input, 
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.auth.input, 
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                     }}
                  />
                  {errorMessage && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ textAlign: "center" }}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSigningIn}
                    variant="contained"
                    sx={{
                      backgroundColor: theme.auth.button.background,
                      color: theme.auth.button.color,
                      mb: 2,
                      borderRadius: "30px",
                      
                    }}
                  >
                    {language.auth.signIn}
                  </Button>
                </Box>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    marginBottom: "16px",
                    color: theme.auth.text,
                  }}
                >
                  {language.auth.registerMsg}
                </Link>
                <GoogleSignInButton
                  isSigningIn={isSigningIn}
                  onGoogleSignIn={onGoogleSignIn}
                ></GoogleSignInButton>
              </Box>
            </Grid2>

            {/* Right column: Image */}
            <Grid2
              item
              xs={6}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                maxHeight: "650px",
                flex: 1,
              }}
            >
              <Box
                component="img"
                src="https://i.pinimg.com/736x/71/5d/8f/715d8f5758684a294067fbb4e1715d30.jpg"
                alt="Login Illustration"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderTopRightRadius: "6px",
                  borderBottomRightRadius: "6px",
                  boxShadow: 2,
                }}
              />
            </Grid2>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
