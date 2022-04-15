export const SignUpValidation = (values) => {
  const errors = {};
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (values.password === "") {
    errors.password = "Password cannot be empty";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be greater than 6 characters";
  }

  if (values.displayName === "") {
    errors.username = "Username cannot be empty";
  }

  return errors;
};
