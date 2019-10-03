export const normalizePrice = (value, previousValue) => {
  if (!value) {
    return value;
  }
  // if (value.match(/^([0][0-9])|[.][0-9]{3}/g)) {
  //   return previousValue;
  // }
  if (value.match(/^\d+$/)) {
    return value;
  }
  // if (value.match(/^[0-9]+([.]?[0-9]*)?$/g)) {
  //   return value;
  // }
  return previousValue;
};

export const normalizeAmount = (value, previousValue) => {
  if (!value) {
    return value;
  }
  if (value.match(/^0/g)) {
    return previousValue;
  }
  return value.replace(/[^\d]/g, "");
};
