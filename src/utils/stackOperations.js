import store from "store/store";
import { imageActions } from "store/image";
import { cloneCanvas } from "./canvasUtils";

export const runRgbOperations = image => {
  const displayRgbCanvas = document.createElement("canvas");
  displayRgbCanvas.width = image.width;
  displayRgbCanvas.height = image.height;
  const displayRgbContext = displayRgbCanvas.getContext("2d");
  let stack = store.getState().image.operationStack["rgbStack"];
  stack.forEach(element => {
    element.params ? element.func(image, displayRgbContext, ...element.params) : element.func(image, displayRgbContext);
  });
  const storeAction = require("store/store");
  let data = {
    displayRgbCanvas: cloneCanvas(displayRgbCanvas)
  };
  storeAction.default.dispatch(imageActions.updateState(data));
};
