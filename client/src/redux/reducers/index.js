import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import teachers from "./teachersReducer";

export default combineReducers({
  auth,
  token,
  teachers,
});
