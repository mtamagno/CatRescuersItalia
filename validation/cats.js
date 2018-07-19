const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCatsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.race = !isEmpty(data.race) ? data.race : "";

  if (!Validator.isLength(data.name, { min: 2, max: 32 })) {
    errors.name = "name bust be between 2 and 32 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.color)) {
    errors.color = "Color is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  if (Validator.isEmpty(data.race)) {
    errors.race = "Race is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
