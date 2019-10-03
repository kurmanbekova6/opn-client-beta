import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router/immutable";
import { reducer as formReducer } from "redux-form";

import { menuReducer } from "./redux/reducers/menuReducers";
import { ordersReducer } from "./redux/reducers/ordersReducers";
import productsReducer from "./redux/reducers/productsReducers";
import { profileMenuItemReducer } from "./redux/reducers/profileMenuReducers";
import { setClientIdReducer } from "./redux/reducers/clientIdReducers";
import { searchReducer } from "./redux/reducers/searchReducer";
import { categoryReducer } from "./redux/reducers/categoryReducers";
import { workspaceMenuReducer } from "./redux/reducers/workspaceMenuReducer";
import {
  loginUserReducer,
  hubspotDataReducer,
  setRegCompFormSkippedReducer,
  loginStatusReducer,
  setTokenReducer,
  setTokenReducerRefresh,
} from "./redux/reducers/userReducers";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    menu: menuReducer,
    loggedIn: loginUserReducer,
    hubspotData: hubspotDataReducer,
    regCompFormSkipped: setRegCompFormSkippedReducer,
    loginStatus: loginStatusReducer,
    product: productsReducer,
    pmenu: profileMenuItemReducer,
    token: setTokenReducer,
    refresh: setTokenReducerRefresh,
    clientId: setClientIdReducer,
    market: ordersReducer,
    search: searchReducer,
    category: categoryReducer,
    workspaceMenu: workspaceMenuReducer,
  });

export default rootReducer;
