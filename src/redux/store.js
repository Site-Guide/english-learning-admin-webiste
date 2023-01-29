import { legacy_createStore as createStore } from "redux";
import combineReducer from "./combineReducers";

const store = createStore(combineReducer);

export default store;
