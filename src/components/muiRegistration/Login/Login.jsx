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

const Login = ({ theme }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container className={classes.loginContainer} maxWidth={false}>
      <Paper elevation={14} className={classes.paperStyle}>
        <Grid container className={classes.gridContainerStyle}>
          <CssBaseline />

          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Log In
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              placeholder="Enter password"
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

          <Grid item xs={12} className={classes.gridItem}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
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
