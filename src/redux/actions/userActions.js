import * as C from "./actionTypes";

export const loginUser = payload => ({
  type: C.LOGIN_USER,
  payload,
});

export const hubspotData = payload => ({
  type: C.HUBSPOT_DATA,
  payload,
});
export const setRegCompFormSkipped = () => ({
  type: C.SET_REG_COMP_FORM_SKIPPED,
});

export const loginStatus = loginStatus => ({
  type: C.LOGIN_STATUS,
  loginStatus,
});

export const setToken = token => ({
  type: C.SET_TOKEN,
  token,
});

export const changeToken = token => ({
  type: C.CHANGE_TOKEN,
  token,
});

export const setTokenRefresh = token => ({
  type: C.SET_TOKEN_REFRESH,
  token,
});

export const changeTokenRefresh = token => ({
  type: C.CHANGE_TOKEN_REFRESH,
  token,
});
