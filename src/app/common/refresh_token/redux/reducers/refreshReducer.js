import * as C from "../actions/actionTypes";

export const refreshReducer = (state = "", action) => {
  switch (action.type) {
    case C.REFRESH_TOKEN:
      return (state = action.token);
    default:
      return state;
  }
};
