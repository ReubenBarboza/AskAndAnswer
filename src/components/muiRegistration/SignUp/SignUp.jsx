import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { useStyles } from "./SignUpStyles";

const SignUp = ({
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerConfirmPassword,
  setRegisterConfirmPassword,
}) => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setHasRegistered(true);
    } catch (error) {
      console.log(error.message);
    }
  };

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
            <TextField
              label="Email"
              placeholder="Email"
              onChange={(e) => setRegisterEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              placeholder="Password"
              onChange={(e) => setRegisterPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              onClick={register}
              variant="contained"
              fullWidth
            >
              Sign Up
            </Button>
            {hasRegistered ? (
              <Typography className={classes.typo} variant="body1">
                Account Successfully Registered!{" "}
                <Link className={classes.link} to="/">
                  Go Back
                </Link>
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUp;
