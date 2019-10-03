import * as C from "../actions/categoryActions";

export const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case C.setOrdersByChosenCat:
      return (state = action.orders);
    default:
      return state;
  }
};
