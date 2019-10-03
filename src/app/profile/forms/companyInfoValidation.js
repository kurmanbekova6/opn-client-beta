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

  // Company name validation
  if (!values || !values.name) {
    errors["name"] = "Company name field is required";
  } else if (values.name.replace(/ /g, "").length < 3) {
    errors["name"] = "Company name length must be at least 3 characters";
  }
  // Description
  if (!values || !values.description) {
    errors["description"] = "Company description field is required";
  } else if (values.description.replace(/ /g, "").length < 10) {
    errors["description"] =
      "Company description length must be at least 3 characters";
  }

  // Country name validation
  if (!values || !values.country) {
    errors["country"] = "Country field is required";
  } else if (values.country.replace(/ /g, "").length === 0) {
    errors["country"] = "Country field is required";
  }

  // Address validation
  if (!values || !values.address) {
    errors["address"] = "Address field is required";
  } else if (values.address.replace(/ /g, "").length < 10) {
    errors["address"] = "Address length must be at least 10 characters";
  }
  // Phone 1
  /* optional field */
  if (values.phone1) {
    const validPhone1 = phone(values.phone1);
    if (validPhone1) errors["phone1"] = validPhone1;
  }

  // Site url validation
  if (!values || !values.site) {
    errors["site"] = "Site field is required";
  } else if (values.site) {
    const validURL = url(values.site);
    if (validURL) errors["site"] = validURL;
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
