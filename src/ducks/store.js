import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import global from "./global";
import users from "./users";
import questions from "./questions";
import home from "./home";
import tags from "./tags";

let reducers = combineReducers({
  global,
  users,
  questions,
  home,
  tags
});

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxPromiseMiddleware()))
);
