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

  // User name
  if (!values || !values.full_name) {
    errors["full_name"] = "Full name field is required";
  } else if (values.full_name.replace(/ /g, "").length < 3) {
    errors["full_name"] = "Full name length must be at least 3 characters";
  }

  // Position
  if (!values || !values.position) {
    errors["position"] = "Position field is required";
  } else if (values.position.replace(/ /g, "").length === 0) {
    errors["position"] = "Position field is required";
  }

  // Mobile
  /* optional field */
  if (values.mobile) {
    const validMobile = phone(values.mobile);
    if (validMobile) errors["mobile"] = validMobile;
  }

  // Chief's phone
  /* optional field */
  if (values.chief_phone) {
    const validChiefPhone = phone(values.chief_phone);
    if (validChiefPhone) errors["chief_phone"] = validChiefPhone;
  }

  // Chief's email
  /* optional field */
  if (values.chief_email) {
    const validChiefEmail = email(values.chief_email);
    if (validChiefEmail) errors["chief_email"] = validChiefEmail;
  }

  // Chief's name
  /* optional field */
  if (
    values.chief_full_name &&
    values.chief_full_name.replace(/ /g, "").length < 3
  ) {
    errors["chief_full_name"] =
      "Chief's name length must be at least 3 characters";
  }

  // User email
  if (!values || !values.email) {
    errors["email"] = "Email field is required";
  } else {
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }

  return errors;
};

export default validateFunc;
