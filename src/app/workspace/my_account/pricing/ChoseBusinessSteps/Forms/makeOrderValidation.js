const validateFunc = values => {
  const errors = {};

  if (!values || !values.amount) {
    errors["amount"] = "Amount field is required";
  }

  if (!values || !values.destination) {
    errors["destination"] = "Destination field is required";
  }

  if (!values || !values.date) {
    errors["date"] = "Date field is required";
  }

  if (!values || !values.deliveryVariant) {
    errors["deliveryVariant"] = "Delivery variant field is required";
  }

  if (!values || !values.deliveryCompany) {
    errors["deliveryCompany"] = "Delivery company field is required";
  }

  if (!values || !values.paymentVariant) {
    errors["paymentVariant"] = "Payment variant field is required";
  }

  return errors;
};

export default validateFunc;
