import React, { useState } from "react";
import SignUpSuccess from "./SignUpSuccess";
import SignUp from "./SignUp";
const Form = () => {
  const [formIsSubmitted, setformIsSubmitted] = useState(false);
  const submitForm = () => {
    setformIsSubmitted(true);
  };
  return (
    <div>
      {!formIsSubmitted ? (
        <SignUp submitForm={submitForm} />
      ) : (
        <SignUpSuccess />
      )}
    </div>
  );
};

export default Form;
