export const selectors = {
  rgbImageUrl: state => state.image.rgbImageUrl,
  depthImageUrl: state => state.image.depthImageUrl,
  mainRgbCanvas: state => state.image.mainRgbCanvas,
  mainDepthCanvas: state => state.image.mainDepthCanvas,
  displayRgbCanvas: state => state.image.displayRgbCanvas,
  prevRgbSize: state => state.image.prevRgbSize,
  parameters: state => state.image.parameters,
  scaleParams: state => state.image.scaleParams,
  operationStack: state => state.image.operationStack
};
