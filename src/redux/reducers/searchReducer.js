import * as C from "../actions/actionTypes";

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case C.SET_SEARCH_RESULT:
      return (state = action.result);
    default:
      return state;
  }
};
