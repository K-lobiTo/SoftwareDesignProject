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
      await doSignInWithEmailAndPassword(email, password);
      // doSendEmailVerification()
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
    <div className="login" style={{backgroundColor:theme.background, minHeight:'92.7vh', width:"100%"}}>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <Container maxWidth="md" >
        <Paper
          elevation={10}
          sx={{
            marginTop: 7,
            marginBottom: 4,
            maxHeight: "600px",
            // padding: 6,
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
              // minWidth={500}
              sx={{
                // backgroundColor: "red",
                boxSizing: "border-box",
                flex: 1,
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  mb: 3,
                  textAlign: "center",
                  fontFamily: "Shrikhand, sans-serif",
                  color: '#825c97',
                  textShadow: '-3px 3px 0px  rgba(0, 0, 0, 1)',
                }}
              >
                {language.appName}
              </Typography>
              <Typography
                component="h1"
                variant="h4"
                sx={{ mb: 3, textAlign: "center" }}
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
                  <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
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
                    sx={{ mb: 2, outlineColor:"red" }}
                  />
                  <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
                    {language.auth.password}
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSigningIn}
                    variant="contained"
                    sx={{
                      backgroundColor: "purple",
                      color: "white",
                      mb: 2,
                      borderRadius: "30px",
                    }}
                  >
                    {language.auth.signIn}
                  </Button>
                </Box>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", marginBottom: "16px" }}
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
                // backgroundColor: "black",
                maxHeight: "600px",
                flex: 1,
              }}
            >
              <Box
                component="img"
                // src="https://i.pinimg.com/736x/18/60/fa/1860fabf0b643057a7e07355d4b8c57a.jpg"
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
