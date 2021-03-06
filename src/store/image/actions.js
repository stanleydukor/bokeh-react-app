import { types } from "./constants";

export const imageActions = {
  handleChange: e => ({ type: types.HANDLE_CHANGE, payload: e.target }),
  initImage: payload => ({ type: types.INIT_IMAGE, payload: payload }),
  updateState: payload => ({ type: types.UPDATE_STATE, payload: payload }),
  storeParameters: payload => ({ type: types.STORE_PARAMETERS, payload: payload }),
  storeScaleParams: payload => ({ type: types.STORE_SCALE_PARAMS, payload: payload }),
  addEffect: payload => ({ type: types.ADD_EFFECT, payload: payload }),
  zoomIn: () => ({ type: types.ZOOM_IN }),
  zoomOut: () => ({ type: types.ZOOM_OUT }),
  removeItem: name => ({ type: types.REMOVE_ITEM, payload: name }),
  removeAllItem: () => ({ type: types.REMOVE_ALL_ITEM })
};
