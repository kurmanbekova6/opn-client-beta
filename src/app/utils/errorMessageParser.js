export const errorMessageParser = error => {
  let errors = [];
  if (error.response) {
    if (error.response.data) {
      if (typeof error.response.data.error_message == "string") {
        errors.push(error.response.data.error_message);
      } else if (typeof error.response.data.result == "string") {
        errors.push(error.response.data.result);
      } else {
        error.response.data.error_message.map(item => {
          errors.push(item.message || item.expected);
        });
      }
    }
  }
  if (errors.length === 0) {
    errors.push("Error!");
    console.error(error);
  }
  return errors;
};
