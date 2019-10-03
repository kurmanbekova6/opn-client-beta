const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const phone = value =>
  value && !/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/i.test(value)
    ? "Invalid number or has no country code"
    : undefined;
const num = value =>
  value && !/^\d+$/i.test(value) ? "This field must be a number" : undefined;

const validateFunc = values => {
  const errors = {};

  if (!values || !values.name) {
    errors["name"] = "Name field is required";
  }

  if (!values || !values.comp_name) {
    errors["comp_name"] = "Company name field is required";
  }

  if (!values || !values.orderFrequency) {
    errors["orderFrequency"] = "This field is required";
  }

  if (!values || !values.email) {
    errors["email"] = "Email field is required";
  } else {
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }

  if (!values || !values.products) {
    errors["products"] = "This field is required";
  } else {
    const validNum = num(values.products);
    if (validNum) errors["products"] = validNum;
  }

  if (!values || !values.storage) {
    errors["storage"] = "This field is required";
  } else {
    const validNum = num(values.storage);
    if (validNum) errors["storage"] = validNum;
  }

  if (!values || !values.users) {
    errors["users"] = "This field is required";
  } else {
    const validNum = num(values.users);
    if (validNum) errors["users"] = validNum;
  }

  if (!values || !values.phone) {
    errors["phone"] = "Phone field is required";
  } else {
    const validPhone = phone(values.phone);
    if (validPhone) errors["phone"] = validPhone;
  }

  return errors;
};

export default validateFunc;
