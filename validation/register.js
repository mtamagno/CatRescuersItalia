const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 32 })) {
    errors.name = "name bust be between 3 and 32 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Emai is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password";
  }

  if (!Validator.isLength(data.password, { min: 5, max: 16 })) {
    errors.password = "password bust be between 5 and 16 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
