import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import * as Immutable from "immutable";
import { routerMiddleware } from "connected-react-router/immutable";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const middleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    save({
      states: [
        "loggedIn",
        "loginStatus",
        "pmenu",
        "menu",
        "token",
        "refresh",
        "clientId",
        "category",
        "workspaceMenu",
        "regCompFormSkipped",
      ],
    }),
    thunk,
    logger
  )
);

export default function configureStore(preloadedState) {
  if (!preloadedState) {
    preloadedState = Immutable.Map();
  }

  const store = createStore(
    rootReducer(history),
    load({
      states: [
        "loggedIn",
        "loginStatus",
        "pmenu",
        "menu",
        "token",
        "refresh",
        "clientId",
        "category",
        "workspaceMenu",
        "regCompFormSkipped",
      ],
      preloadedState,
      disableWarnings: true,
    }),
    middleware
  );
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer(history));
      });
    }
  }

  return store;
}
