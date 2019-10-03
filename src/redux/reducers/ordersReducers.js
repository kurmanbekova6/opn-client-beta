import * as C from "../actions/actionTypes";

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case C.TEST_ACTION:
      return { ...state, orders: [] };

    case C.TEST_ACTION_SECOND:
      return state;

    case C.SAVE_SELL_ORDERS:
      return { ...state, sellOrders: action.payload };

    case C.SAVE_BUY_ORDERS:
      return { ...state, buyOrders: action.payload };

    default:
      return state;
  }
};
