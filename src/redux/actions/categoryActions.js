import * as C from "./actionTypes";

export const setOrdersByChosenCat = orders => ({
  type: C.GET_ORDERS_BY_CATEGORY,
  orders,
});
