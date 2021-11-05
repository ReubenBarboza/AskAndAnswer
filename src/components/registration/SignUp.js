import React, { useState, useEffect } from "react";
import { SignUpValidation } from "./SignUpValidation";

const SignUp = ({ submitForm }) => {
  const [userSignedUp, setUserSignedUp] = useState([]);
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isDataCorrect, setisDataCorrect] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(SignUpValidation(values));
    setisDataCorrect(true);
    const newSignedUpUser = values;
    setUserSignedUp([...userSignedUp, newSignedUpUser]);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isDataCorrect) {
      submitForm();
    }
  }, [errors, isDataCorrect, submitForm]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          ></input>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
          ></input>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          ></input>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          ></input>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
