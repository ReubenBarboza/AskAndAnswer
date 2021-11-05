import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "20px auto",
  },
  gridContainerStyle: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
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
});

const Login = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper elevation={10} className={classes.paperStyle}>
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
              type="password"
              fullWidth
              required
              margin="dense"
            ></TextField>
            <div className={classes.showPassword}>Show Password</div>
          </div>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Log In
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
