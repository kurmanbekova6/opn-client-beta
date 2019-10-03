import * as C from "../actions/actionTypes";

export const loginUserReducer = (state = [], action) => {
  switch (action.type) {
    case C.LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
};
export const hubspotDataReducer = (state = [], action) => {
  switch (action.type) {
    case C.HUBSPOT_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const setRegCompFormSkippedReducer = (state = false, action) => {
  switch (action.type) {
    case C.SET_REG_COMP_FORM_SKIPPED:
      return true;
    default:
      return state;
  }
};

export const loginStatusReducer = (state = false, action) => {
  switch (action.type) {
    case C.LOGIN_STATUS:
      return (state = action.loginStatus);
    default:
      return state;
  }
};

export const setTokenReducer = (state = "", action) => {
  switch (action.type) {
    case C.SET_TOKEN:
      return (state = action.token);
    case C.CHANGE_TOKEN:
      return (state = action.token);
    default:
      return state;
  }
};

export const setTokenReducerRefresh = (state = "", action) => {
  switch (action.type) {
    case C.SET_TOKEN_REFRESH:
      return (state = action.token);
    case C.CHANGE_TOKEN_REFRESH:
      return (state = action.token);
    default:
      return state;
  }
};
