export const SignUpValidation = (values) => {
  const errors = {};
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords are different";
  }

  return errors;
};
