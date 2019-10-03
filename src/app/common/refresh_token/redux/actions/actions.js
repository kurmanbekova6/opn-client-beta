import * as C from "./actionTypes";

export const refreshAction = token => ({
  type: C.REFRESH_TOKEN,
  token,
});
