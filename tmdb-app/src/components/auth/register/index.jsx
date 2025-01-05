import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Stack,
  Grid2,
} from "@mui/material";
import { useLanguage } from "../../../contexts/languageProvider";
import { useTheme } from "../../../contexts/themeProvider";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <div
      className="register"
      style={{
        backgroundColor: theme.background,
        minHeight: "92.7vh",
        width: "100%",
      }}
    >
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            marginTop: 7,
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
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                maxHeight: "600px",
                flex: 1,
              }}
            >
              <Box
                component="img"
                src="https://i.pinimg.com/736x/18/60/fa/1860fabf0b643057a7e07355d4b8c57a.jpg"
                // src="https://i.pinimg.com/736x/71/5d/8f/715d8f5758684a294067fbb4e1715d30.jpg"
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
            <Grid2
              item
              xs={6}
              md={3}
              sx={{
                // display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "500px",
                flex: 1,
                p: 4,
              }}
            >
              <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                {language.auth.signUp}
              </Typography>
              <Box component="form" onSubmit={onSubmit}>
                <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
                  {language.auth.email}
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
                  {language.auth.password}
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
                  {language.auth.confirmPassword}
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
                  sx={{
                    backgroundColor: "purple",
                    color: "white",
                    mb: 2,
                    borderRadius: "30px",
                  }}
                >
                  {language.auth.register}
                </Button>
              </Box>
              <Link
                to="/login"
                style={{ textDecoration: "none", marginBottom: "16px" }}
              >
                {language.auth.signInMsg}
              </Link>
            </Grid2>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
