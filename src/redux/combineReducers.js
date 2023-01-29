import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import pageStatusReducer from "./reducers/pageStatusReducer";

const combineReducer = combineReducers({ authReducer, pageStatusReducer });

export default combineReducer;
