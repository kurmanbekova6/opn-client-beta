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
const url = value =>
  value &&
  !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
    value
  )
    ? "Invalid URL"
    : undefined;
const facebook = value =>
  value &&
  !/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/i.test(
    value
  )
    ? "Invalid facebook profile address"
    : undefined;
const linkedIn = value =>
  value &&
  !/(?:(?:http|https):\/\/)?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i.test(
    value
  )
    ? "Invalid LinkedIn profile address"
    : undefined;

const validateFunc = values => {
  const errors = {};

  // User name
  if (!values || !values.full_name) {
    errors["full_name"] = "Full name field is required";
  } else if (values.full_name.replace(/ /g, "").length < 3) {
    errors["full_name"] = "Full name length must be at least 3 characters";
  }

  if (!values || !values.email) {
    errors["email"] = "Email field is required";
  } else {
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }
  if (!values || !values.userEmail) {
    errors["userEmail"] = "Personal Email field is required";
  } else {
    const validUserEmail = email(values.userEmail);
    if (validUserEmail) errors["userEmail"] = validUserEmail;
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
