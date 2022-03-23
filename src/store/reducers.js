import { combineReducers } from "redux";
import { themeReducer } from "./theme";

const appReducer = combineReducers({
  theme: themeReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
