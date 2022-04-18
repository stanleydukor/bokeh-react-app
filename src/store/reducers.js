import { combineReducers } from "redux";
import { imageReducer } from "./image";
import { themeReducer } from "./theme";

const appReducer = combineReducers({
  theme: themeReducer,
  image: imageReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
