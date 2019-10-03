import * as C from "../actions/actionTypes";

export const setClientIdReducer = (state = "", action) => {
  switch (action.type) {
    case C.SET_CLIENT_ID:
      return action.payload;
    default:
      return state;
  }
};
