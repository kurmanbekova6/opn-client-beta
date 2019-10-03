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

const validateFunc = (values, ...rest) => {
  const errors = {};

  // User name
  if (
    values.fullName !== undefined &&
    values.fullName.replace(/ /g, "").length < 3
  ) {
    errors["fullName"] = "Full name length must be at least 3 characters";
  }
  if (
    values.companyName !== undefined &&
    values.companyName.replace(/ /g, "").length < 3
  ) {
    errors["companyName"] = "Company name length must be at least 3 characters";
  }
  if (
    values.companyDescription !== undefined &&
    values.companyDescription.replace(/ /g, "").length < 3
  ) {
    errors["companyDescription"] =
      "Company description length must be at least 3 characters";
  }
  if (
    values.address !== undefined &&
    values.address.replace(/ /g, "").length < 5
  ) {
    errors["address"] = "Address length must be at least 5 characters";
  }

  if (values.email !== undefined) {
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }
  if (values.userEmail !== undefined) {
    const validUserEmail = email(values.userEmail);
    if (validUserEmail) errors["userEmail"] = validUserEmail;
  }
  if (values.phone1 !== undefined) {
    const validPhone = phone(values.phone);
    if (validPhone) errors["phone"] = validPhone;
  }
  if (values.userPhone !== undefined) {
    const validPhone = phone(values.userPhone);
    if (validPhone) errors["userPhone"] = validPhone;
  }
  if (values.site !== undefined) {
    const validUrl = url(values.site);
    if (validUrl) errors["site"] = validUrl;
  }

  // if (!values || !values.password) {
  //   errors["password"] = "Password field is required";
  // }
  //
  // if (!values || !values.confirmPassword) {
  //   errors["confirmPassword"] = "Confirm password field is required";
  // }

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
