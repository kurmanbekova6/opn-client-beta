import * as C from "./actionTypes";

export const saveProducts = originList => {
  return { type: C.SAVE_PRODUCTS, originList };
};

export const setProducts = productList => {
  return { type: C.SET_PRODUCTS, productList };
};

export const getExistProducts = () => {
  return { type: C.GET_EXIST_PRODUCTS };
};

export const getProductsByCompany = companyName => {
  return { type: C.GET_PRODUCTS_BY_COMPANY, companyName };
};

export const orderPaid = paidOrderId => {
  return { type: C.ORDER_PAID, paidOrderId };
};

export const productsSorting = sortType => {
  /**
   * Available sortType:
   *
   * az: alphabetic product name
   * date: by date
   * price: by product price
   * region: by product region
   */
  return { type: C.PRODUCTS_SORTING, sortType };
};
