const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const validateFunc = values => {
  const errors = {};

  if (!values || !values.company) {
    errors["company"] = "Company field is required";
  } else if (values.company.length < 3) {
    errors["company"] = "Company length must be at least 3 characters";
  }

  if (!values || !values.price) {
    errors["price"] = "Price field is required";
  }

  if (!values || !values.units) {
    errors["units"] = "Units field is required";
  }

  if (!values || !values.amount) {
    errors["amount"] = "Amount field is required";
  }

  if (!values || !values.logistic) {
    errors["logistic"] = "Logistic field is required";
  }

  if (!values || !values.email) {
    errors["email"] = "Email field is required";
  } else {
    const validEmail = email(values.email);
    if (validEmail) errors["email"] = validEmail;
  }

  return errors;
};

export default validateFunc;
