import axios from "axios";
import { store } from "../index";
import { setClientId } from "../redux/actions/clientIdActions";

export const fetchClientId = () => {
  axios
    .get("/client/id")
    .then(res => {
      if (res.status === 200 || res.status === 304) {
        store.dispatch(setClientId(res.data.result.clientId));
      }
    })
    .catch(error => {
      console.log(error);
    });
};
