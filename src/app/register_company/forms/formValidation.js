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

  if (!values || !values.userName) {
    errors["userName"] = "User name field is required";
  } else if (values.userName.replace(/ /g, "").length < 3) {
    errors["userName"] = "User name length must be at least 3 characters";
  }

  if (!values || !values.companyName) {
    errors["companyName"] = "Company name field is required";
  } else if (values.companyName.replace(/ /g, "").length < 3) {
    errors["companyName"] = "Company name length must be at least 3 characters";
  }

  if (!values || !values.companyDescription) {
    errors["companyDescription"] = "Company description field is required";
  } else if (values.companyDescription.replace(/ /g, "").length < 3) {
    errors["companyDescription"] =
      "Company description length must be at least 3 characters";
  }

  if (!values || !values.userPosition) {
    errors["userPosition"] = "Position field is required";
  } else if (values.userPosition.replace(/ /g, "").length === 0) {
    errors["userPosition"] = "Position field is required";
  }
  if (!values || !values.wallet) {
    errors["wallet"] = "Wallet field is required";
  } else if (values.wallet.replace(/ /g, "").length === 0) {
    errors["wallet"] = "Wallet field is required";
  }
  if (!values || !values.country) {
    errors["country"] = "Country field is required";
  } else if (values.country.replace(/ /g, "").length === 0) {
    errors["country"] = "Country field is required";
  }
  if (!values || !values.address) {
    errors["address"] = "Address field is required";
  } else if (values.address.replace(/ /g, "").length === 0) {
    errors["address"] = "Address field is required";
  }
  if (!values || !values.jurisdiction) {
    errors["jurisdiction"] = "Jurisdiction Of Incorporation is required";
  } else if (values.jurisdiction.replace(/ /g, "").length === 0) {
    errors["jurisdiction"] = "Jurisdiction Of Incorporation is required";
  }
  /* optional field */
  if (values.companyPhone) {
    const validPhone = phone(values.companyPhone);
    if (validPhone) errors["companyPhone"] = validPhone;
  }

  /* optional field */
  if (values.companySite) {
    const validURL = url(values.companySite);
    if (validURL) errors["companySite"] = validURL;
  }

  /* optional field */
  if (values.companyFacebook) {
    const validFB = facebook(values.companyFacebook);
    if (validFB) errors["companyFacebook"] = validFB;
  }

  /* optional field */
  if (values.companyLinkedIn) {
    const validLIn = linkedIn(values.companyLinkedIn);
    if (validLIn) errors["companyLinkedIn"] = validLIn;
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

  return errors;
};

export default validateFunc;
