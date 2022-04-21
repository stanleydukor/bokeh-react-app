import { types } from "./constants";

export const djangoActions = {
  applyBlur: payload => ({ type: types.APPLY_BLUR, payload: payload })
};
