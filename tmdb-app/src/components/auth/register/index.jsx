import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { Box, Typography, Container, Paper, TextField, Button } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            marginTop: 4,
            padding: 6,
          }}
        >
          <Box component='form' onSubmit={onSubmit}>
            <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
              Correo / Email
            </Typography>
            <TextField
              fullWidth
              required
              type="email"
              value={email}
              disabled={isRegistering}
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
              value={password}
              disabled={isRegistering}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
              Confirmar Contraseña / Password
            </Typography>
            <TextField
              fullWidth
              required
              disabled={isRegistering}
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isRegistering}
              variant="contained"
              sx={{ backgroundColor: "purple", color: "white", mb: 2 }}
            >
                Register/Registrarse
            </Button>
          </Box>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", marginBottom: "16px" }}
                >
                  Ya tienes cuenta? 
                </Link>
        </Paper>
      </Container>

    </>
  );
};

export default Register;
