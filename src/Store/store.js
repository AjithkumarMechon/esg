import {
  legacy_createStore as createStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { loginReducer } from "../Redux/loginSlice";

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = createStore(rootReducer);

export default store;
