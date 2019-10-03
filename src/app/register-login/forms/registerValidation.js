const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const validateFunc = values => {
  const errors = {};

  if (!values || !values.contactFullName) {
    errors["contactFullName"] = "Contact full name field is required";
  } else if (values.contactFullName.length < 3) {
    errors["contactFullName"] =
      "Contact name length must be at least 3 characters";
  }

  if (!values || !values.companyFullName) {
    errors["companyFullName"] = "Company full name field is required";
  } else if (values.companyFullName.length < 3) {
    errors["companyFullName"] =
      "Company name length must be at least 3 characters";
  }

  if (!values || !values.country) {
    errors["country"] = "Country field is required";
  }

  if (!values || !values.email) {
    errors["email"] = "Email field is required";
  } else {
    // errors['email'] = email(values.email);
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }

  if (!values || !values.password) {
    errors["password"] = "Password field is required";
  }

  if (!values || !values.confirmPassword) {
    errors["confirmPassword"] = "Confirm password field is required";
  }

  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors["confirmPassword"] = "Passwords don't match";
  }

  return errors;
};

export default validateFunc;
