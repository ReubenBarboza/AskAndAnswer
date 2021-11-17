import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { useStyles } from "./SignUpStyles";
import { SignUpValidation } from "./SignUpValidation";

const SignUp = ({
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerDisplayName,
  setRegisterDisplayName,
  user,
}) => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => setErrors(SignUpValidation(values)), [values]);

  const register = async () => {
    setRegisterClicked(true);
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      // to avoid false positives
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
        setHasRegistered(true);
        user &&
          updateProfile(auth.currentUser, {
            displayName: registerDisplayName,
          })
            .then()
            .catch((error) => console.log(error.message));
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setRegisterPassword(e.target.value);
                setValues({ ...values, password: e.target.value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              required
            />
            {registerClicked && errors.password && <p>{errors.password}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              placeholder="Username"
              type="text"
              onChange={(e) => {
                setRegisterDisplayName(e.target.value);
                setValues({ ...values, displayName: e.target.value });
              }}
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
