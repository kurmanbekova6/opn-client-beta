const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const phone = value =>
  value &&
  !/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})$/i.test(
    value
  )
    ? "Invalid phone number"
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

  if (!values || !values.continent) {
    errors["continent"] = "Continent field is required";
  }
  if (!values || !values.country) {
    errors["country"] = "Country field is required";
  }
  if (!values || !values.zip) {
    errors["zip"] = "ZIP code is required";
  }
  if (!values || !values.city) {
    errors["city"] = "City field is required";
  }
  if (!values || !values.phone) {
    errors["phone"] = "Phone field is required";
  } else {
    const validPhone = phone(values.phone);
    if (validPhone) errors["phone"] = validPhone;
  }

  if (!values || !values.email) {
    errors["email"] = "Email field is required";
  } else {
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }

  if (!values || !values.password) {
    errors["password"] = "Password field is required";
  } else if (values.password.length < 6) {
    errors["password"] = "Password length must be at least 6 characters";
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
