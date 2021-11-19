import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Grid,
  Paper,
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CssBaseline,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "./LoginStyles";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../firebase/firebase-config";

const Login = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setError("");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };
  return (
    <Container className={classes.loginContainer} maxWidth={false}>
      <Paper elevation={14} className={classes.paperStyle}>
        <Grid container className={classes.gridContainerStyle}>
          <CssBaseline />

          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Log in
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <TextField
              label="Email"
              placeholder="Enter email"
              onChange={(e) => setLoginEmail(e.target.value)}
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              placeholder="Enter password"
              onChange={(e) => setLoginPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.errorText}>
                {error}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} className={classes.gridItem}>
            <Button
              type="submit"
              onClick={login}
              color="primary"
              variant="contained"
              fullWidth
            >
              Log In
            </Button>
            <Link to="/SignUp" className={classes.link}>
              <p>Register an account</p>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
