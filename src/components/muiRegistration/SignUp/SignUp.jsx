import React, { useState, useEffect } from "react";
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
import { SignUpValidation } from "./SignUpValidation";

const SignUp = ({
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerConfirmPassword,
  setRegisterConfirmPassword,
}) => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => setErrors(SignUpValidation(values)), [values]);

  const register = async () => {
    setRegisterClicked(true);
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
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
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
                setValues({ ...values, email: e.target.value });
              }}
              fullWidth
              required
            />
            {registerClicked && errors.email && <p>{errors.email}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setRegisterPassword(e.target.value);
                setValues({ ...values, password: e.target.value });
              }}
              fullWidth
              required
            />
            {registerClicked && errors.password && <p>{errors.password}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => {
                setRegisterConfirmPassword(e.target.value);
                setValues({ ...values, confirmPassword: e.target.value });
              }}
              fullWidth
              required
            />
            {registerClicked && errors.confirmPassword && (
              <p>{errors.confirmPassword}</p>
            )}
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
