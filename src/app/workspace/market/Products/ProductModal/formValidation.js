const number = value =>
  value && !/^-?\d*\.?\d*$/i.test(value) ? "Invalid data" : undefined;

const validateFunc = values => {
  const errors = {};

  if (!values || !values.category) {
    errors["category"] = "Category field is required";
  }

  if (!values || !values.productName) {
    errors["productName"] = "Product name field is required";
  } else if (values.productName.replace(/ /g, "").length < 3) {
    errors["productName"] = "Product name length must be at least 3 characters";
  }

  if (!values || !values.location) {
    errors["location"] = "Location field is required";
  }

  if (!values || !values.parameters) {
    errors["parameters"] = "Parameters field is required";
  } else if (values.parameters.replace(/ /g, "").length < 3) {
    errors["parameters"] = "Parameters length must be at least 3 characters";
  }

  if (!values || !values.deliveryVariants) {
    errors["deliveryVariants"] = "Delivery variants field is required";
  }

  if (!values || !values.price) {
    errors["price"] = "Price terms field is required";
  }

  if (!values || !values.deliveryTerms) {
    errors["deliveryTerms"] = "Delivery terms field is required";
  }

  if (!values || !values.unit) {
    errors["unit"] = "Unit field is required";
  }

  /* optional field */
  if (values.price) {
    const validPrice = number(values.price);
    if (validPrice) errors["price"] = validPrice;
  }
  if (values.deliveryTerms) {
    const validTerms = number(values.deliveryTerms);
    if (validTerms) errors["deliveryTerms"] = validTerms;
  }

  return errors;
};

export default validateFunc;
