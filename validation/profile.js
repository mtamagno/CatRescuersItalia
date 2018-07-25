const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile Handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Profile status is required";
  }

  if (!isEmpty(data.WebSite)) {
    if (!Validator.isURL(data.WebSite)) {
      errors.WebSite = "Not a valid url";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid url";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid url";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
