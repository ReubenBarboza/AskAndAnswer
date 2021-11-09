import React from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useStyles } from "./SignUpStyles";

const SignUp = () => {
  const classes = useStyles();
  return (
    <Container className={classes.signUpContainer} maxWidth={false}>
      <Paper elevation={14} className={classes.paper}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Sign Up
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" placeholder="Email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              placeholder="Password"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUp;
