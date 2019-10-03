const validateFunc = values => {
  const errors = {};

  if (!values || !values.name) {
    errors["name"] = "Name field is required";
  } else if (values.name.length < 3) {
    errors["name"] = "Name length must be at least 3 characters";
  }

  if (!values || !values.card_num) {
    errors["card_num"] = "Card number field is required";
  } else if (values.card_num.length < 3) {
    errors["card_num"] = "Card number length must be at least 3 characters";
  }

  if (!values || !values.cvv) {
    errors["cvv"] = "CVV field is required";
  } else if (values.cvv.length > 3) {
    errors["cvv"] = "Card number length must be 3 characters";
  } else if (values.cvv.length < 3) {
    errors["cvv"] = "Card number length must be 3 characters";
  }

  if (!values || !values.date) {
    errors["date"] = "Date field is required";
  } else if (values.date.length > 5) {
    errors["date"] = "Card number length must be 4 characters";
  } else if (values.date.length < 5) {
    errors["date"] = "Card number length must be 4 characters";
  }

  return errors;
};

export default validateFunc;
