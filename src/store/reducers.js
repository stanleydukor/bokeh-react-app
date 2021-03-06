import { combineReducers } from "redux";
import { djangoReducer } from "./django";
import { imageReducer } from "./image";
import { themeReducer } from "./theme";

const appReducer = combineReducers({
  django: djangoReducer,
  theme: themeReducer,
  image: imageReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
