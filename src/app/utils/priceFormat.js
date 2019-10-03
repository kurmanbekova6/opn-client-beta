import numeral from "numeral";

export const priceFormat = price => {
  if (price !== null) {
    let newPrice = price
      .toString()
      .split("")
      .slice(0, -2)
      .join("");
    let number = numeral(newPrice);
    let res = number.format("0.00");
    return res;
  } else {
    return "No price";
  }
};
