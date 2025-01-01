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

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            marginTop: 4,
            padding: 6,
          }}
        >
          <Grid2
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Sign In / Iniciar Sesión
            </Typography>
            {/* Left column: Form */}
            <Stack spacing={2} direction="row">
              <Grid2 item xs={12} md={6} minWidth={300} >
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
                      Correo / Email
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
                      Contraseña / Password
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
                      sx={{ backgroundColor: "purple", color: "white", mb: 2 }}
                    >
                      Sign In / Ingresar
                    </Button>
                  </Box>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", marginBottom: "16px" }}
                  >
                    No tienes cuenta? Regístrate
                  </Link>
                  <GoogleSignInButton
                    isSigningIn={isSigningIn}
                    onGoogleSignIn={onGoogleSignIn}
                  ></GoogleSignInButton>
                </Box>
              </Grid2>

              {/* Right column: Image */}
              <Grid2 item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://cinematroisi.it/wp-content/uploads/2021/09/%C2%A9Flavia-Rossi_Cinema-Troisi_001-Copia-1024x814.jpg"
                  alt="Login Illustration"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </Grid2>
            </Stack>
          </Grid2>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
