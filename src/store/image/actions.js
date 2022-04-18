import { types } from "./constants";

export const imageActions = {
  handleChange: e => ({ type: types.HANDLE_CHANGE, payload: e.target }),
  initImage: payload => ({ type: types.INIT_IMAGE, payload: payload }),
  updateState: payload => ({ type: types.UPDATE_STATE, payload: payload }),
  selectTool: payload => ({ type: types.SELECT_TOOL, payload: payload }),
  storeScaleParams: payload => ({ type: types.STORE_SCALE_PARAMS, payload: payload }),
  storeToolParameters: payload => ({ type: types.STORE_TOOL_PARAMETERS, payload: payload }),
  storeParameters: payload => ({ type: types.STORE_PARAMETERS, payload: payload }),
  storeGroundParams: payload => ({ type: types.STORE_GROUND_PARAMS, payload: payload }),
  initLayer: () => ({ type: types.INIT_LAYER }),
  addLayer: () => ({ type: types.ADD_LAYER }),
  updateLayerIndex: index => ({ type: types.UPDATE_LAYER_INDEX, payload: index }),
  updateLayer: payload => ({ type: types.UPDATE_LAYER, payload: payload }),
  duplicateLayer: key => ({ type: types.DUPLICATE_LAYER, payload: key }),
  removeLayer: key => ({ type: types.REMOVE_LAYER, payload: key }),
  removeAllLayers: () => ({ type: types.REMOVE_ALL_LAYER }),
  addOperation: payload => ({ type: types.ADD_OPERATION, payload: payload }),
  removeOperation: payload => ({ type: types.REMOVE_OPERATION, payload: payload }),
  addEffect: payload => ({ type: types.ADD_EFFECT, payload: payload }),
  zoomIn: () => ({ type: types.ZOOM_IN }),
  zoomOut: () => ({ type: types.ZOOM_OUT }),
  undo: () => ({ type: types.UNDO }),
  clear: () => ({ type: types.CLEAR }),
  reset: () => ({ type: types.RESET }),
  removeItem: name => ({ type: types.REMOVE_ITEM, payload: name }),
  removeAllItem: () => ({ type: types.REMOVE_ALL_ITEM })
};
