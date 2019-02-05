import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store.js";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
