import { combineReducers } from "redux";
import { userReducer } from "./user";
import { projectReducer } from "./project";
import { usersManageReducer } from "./userManage";

export let rootReducer = combineReducers({
  userReducer,
  projectReducer,
  usersManageReducer,

});
