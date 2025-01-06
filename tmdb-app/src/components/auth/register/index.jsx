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
import { auth } from "../../../firebase/firebase";

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
    
    if (password.length < 6) {
      setErrorMessage(language.auth.passwordTooShort); 
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage(language.auth.passwordsDontMatch);
      return;
    }
  
    setErrorMessage("");
  
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/catalog");
      } catch (error) {
        if (error ===  "Firebase: Error (auth/email-already-in-use).") {
          setErrorMessage(language.auth.alrearInUse);
        }
        else {
          setErrorMessage(error);
        }
      } finally {
        setIsRegistering(false);
      }
    }
  };
  

  return (
    <div
      className="register"
      style={{
        backgroundColor: theme.background,
        minHeight: "93.7vh",
        width: "100%",
      }}
    >
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            marginTop: 16,
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
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                height: "650px",
                flex: 1,
              }}
            >
              <Box
                component="img"
                src="https://i.pinimg.com/736x/18/60/fa/1860fabf0b643057a7e07355d4b8c57a.jpg"
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
                alignItems: "center",
                justifyContent: "center",
                minHeight: "500px",
                flex: 1,
                p: 4,
              }}
            >
              <Typography
                component="h2"
                variant="h4"
                sx={{
                  mb: 1,
                  pt: 4,
                  textAlign: "center",
                  pb: 2,
                  color: theme.auth.text,
                }}
              >
                {language.auth.signUp}
              </Typography>
              <Box component="form" onSubmit={onSubmit}>
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{
                    mb: 1,
                    color: theme.auth.text,
                  }}
                >
                  {language.auth.email}
                </Typography>
                <TextField
                  fullWidth
                  required
                  type="email"
                  value={email}
                  disabled={isRegistering}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    mb: 2,
                    color: theme.auth.text,
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
                  sx={{
                    mb: 1,
                    color: theme.auth.text,
                  }}
                >
                  {language.auth.password}
                </Typography>
                <TextField
                  fullWidth
                  required
                  type="password"
                  value={password}
                  disabled={isRegistering}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ 
                    mb: 3, 
                    textDecorationColor: theme.auth.text,
                    color: theme.auth.text,
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
                  {language.auth.confirmPassword}
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={isRegistering}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  sx={{
                    color: theme.auth.text,
                    mb: 3,
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
                    sx={{
                      color: "red",
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  disabled={isRegistering}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.auth.button.background,
                    color: theme.auth.button.color,
                    mb: 2,
                    borderRadius: "30px",
                  }}
                >
                  {language.auth.register}
                </Button>
                
              </Box>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  marginBottom: "16px",
                  color: theme.auth.text,
                }}
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
