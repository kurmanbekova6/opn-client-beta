import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./app/ui_components/materialThemes";

import configureStore from "./configureStore";
import App from "./app/App";

import "bootstrap/dist/css/bootstrap.css";

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
