import axios from "axios";
import * as C from "./redux/actions/actionTypes";

export const RefreshToken = (clientId, token) => {
  return dispatch => {
    axios
      .post(`/user/refresh`, {
        clientId: clientId,
        refresh_token: token,
      })
      .then(res => {
        dispatch(refreshAction(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const refreshAction = token => ({
  type: C.REFRESH_TOKEN,
  token,
});
