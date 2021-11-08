import React, { useState } from "react";

import {
  Typography,
  Grid,
  Paper,
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "50px auto",
  },
  gridContainerStyle: {
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordContainer: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  },
  showPassword: {
    fontSize: "12px",
    cursor: "pointer",
  },
  loginContainer: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    boxShadow: "0 0 200px rgba(0,0,0,0.9) inset",
  },
});

const Login = ({ theme }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container className={classes.loginContainer} maxWidth={false}>
      <Paper elevation={14} className={classes.paperStyle}>
        <Grid container className={classes.gridContainerStyle} spacing={0}>
          <Grid item>
            <Typography variant="h4">Log In</Typography>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
          ></TextField>
          <div className={classes.passwordContainer}>
            <TextField
              label="Password"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="dense"
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
          </div>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Log In
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
