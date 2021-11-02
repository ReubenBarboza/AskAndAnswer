export const SignUpValidation = (values) => {
  const errors = {};
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (values.username === "") {
    errors.username = "Username cannot be empty";
  }
  if (values.username.length < 5) {
    errors.username = "Username must be greater than 5 characters";
  }
  if (!/^[a-zA-Z0-9]+/.test(values.username)) {
    errors.username = "Username must be of alphanumeric characters only";
  }
  if (values.password === "") {
    errors.password = "Password cannot be empty";
  }
  if (values.password.length < 5) {
    errors.password = "Password must be greater than 5 characters";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords are different";
    values.confirmPassword = "";
    values.password = "";
  }

  return errors;
};
