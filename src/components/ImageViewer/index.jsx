import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { imageActions } from "store/image";
import { selectors as imageSelectors } from "store/image";
import ImageViewerStyle from "./style";
import { getImageUrl, scribblePathConverter } from "utils/generalUtils";
import {
  cloneCanvas,
  drawCanvasImage,
  cropCanvas,
  highlightPixelArea,
  getRatio,
  getDimension,
  drawBox,
  drawScaledCanvasImage,
  getBoundingArea,
  upScaleBox,
  downScaleBox,
  drawScribble,
  upScalePoint,
  downScalePoint,
  getScribbleRange,
  boxToDimension,
  canvasResize
} from "utils/canvasUtils";
import { runDepthOperations, runCachedDepthOperations } from "utils/stackOperations";
import { GroundBox, SelectionBox } from "config/toolBox";
import { getScribbleValues } from "utils/calculation";

let objectUrl = null;

class ImageViewer extends Component {
  constructor() {
    super();
    this.rgbImageRef = createRef();
  }
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    initBoundingBox: null
  };
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(prevProps) {
    let { rgbImageRef } = this;
    let {
      rgbImageUrl,
      mainDepthCanvas,
      displayDepthCanvas,
      isEffectNew,
      prevDepthSize,
      scribbleParams,
      groundParams,
      depthScaleParams,
      tools,
      groundTools,
      parameters,
      operationStack,
      initImage,
      initDepth,
      initLayer,
      storeScaleParams,
      storeParameters,
      addOperation,
      addEffect
    } = this.props;
    let depthCanvas = rgbImageRef.current;
    let depthContext = depthCanvas.getContext("2d");
    // Load image and initialize main depth canvas
    if (prevProps.rgbImageUrl !== rgbImageUrl) {
      depthContext.clearRect(0, 0, prevDepthSize.width, prevDepthSize.height);
      let rgbImage = new Image();
      objectUrl = getImageUrl(rgbImageUrl);
      rgbImage.src = objectUrl;
      rgbImage.onload = () => {
        if (Math.max(rgbImage.height, rgbImage.width) > 1000) {
          rgbImage = canvasResize(rgbImage);
        }
        initDepth(cloneCanvas(rgbImage));
      };
    }
    // If main image changes, add draw/redraw canvas to operation
    if (prevProps.mainDepthCanvas !== mainDepthCanvas) {
      if (mainDepthCanvas) {
        const { ratio, centerShift_x, centerShift_y } = getRatio(mainDepthCanvas, depthCanvas);
        initImage({
          prevDepthSize: { width: depthCanvas.width, height: depthCanvas.height }
        });
        storeScaleParams({ name: "depthScaleParams", value: { ratio, centerShift_x, centerShift_y } });
        addEffect({
          name: "depthStack",
          value: {
            func: drawCanvasImage
          }
        });
        initLayer();
      }
    }
    // If operation is added to the stack, rerun all operations in operation stack
    if (prevProps.operationStack.depthStack !== operationStack.depthStack) {
      if (mainDepthCanvas) {
        if (isEffectNew) {
          runDepthOperations(mainDepthCanvas);
        } else {
          runCachedDepthOperations(mainDepthCanvas);
        }
      }
    }
    if (
      prevProps.displayDepthCanvas !== displayDepthCanvas ||
      prevProps.depthScaleParams !== depthScaleParams ||
      prevProps.parameters.croppedArea !== parameters.croppedArea ||
      prevProps.groundParams.rectangle !== groundParams.rectangle
    ) {
      if (displayDepthCanvas) {
        const { ratio, centerShift_x, centerShift_y, translatePos, scale } = depthScaleParams;
        drawScaledCanvasImage(
          displayDepthCanvas,
          depthCanvas,
          ratio,
          centerShift_x,
          centerShift_y,
          scale,
          translatePos
        );
        if (parameters.croppedArea) {
          drawBox(
            depthCanvas,
            downScaleBox(parameters.croppedArea, ratio, centerShift_x, centerShift_y, translatePos, scale)
          );
        }
        if (groundParams.rectangle) {
          drawBox(
            depthCanvas,
            downScaleBox(groundParams.rectangle, ratio, centerShift_x, centerShift_y, translatePos, scale)
          );
        }
        if (Array.isArray(scribbleParams.path) || scribbleParams.path.length) {
          for (let i = 0; i < scribbleParams.path.length; i++) {
            drawScribble(
              depthCanvas.getContext("2d"),
              downScalePoint(scribbleParams.path[i].start, ratio, centerShift_x, centerShift_y, translatePos, scale),
              downScalePoint(scribbleParams.path[i].end, ratio, centerShift_x, centerShift_y, translatePos, scale)
            );
          }
        }
      } else {
        let depthContext = depthCanvas.getContext("2d");
        depthContext.clearRect(0, 0, depthCanvas.width, depthCanvas.height);
      }
    }
    // Highlight pixel range from specified range for either cropped image or initial full image
    if (prevProps.parameters.histogramParams.pixelRange !== parameters.histogramParams.pixelRange) {
      if (parameters.histogramParams.pixelRange || parameters.croppedArea) {
        const { croppedArea, histogramParams } = parameters;
        let newArea = null;
        if (croppedArea) {
          newArea = croppedArea;
        } else {
          newArea = getBoundingArea(displayDepthCanvas);
        }
        addOperation({
          name: "depthStack",
          value: { func: highlightPixelArea, params: [newArea, histogramParams.pixelRange] }
        });
      }
    }
    // Listens for mouse movements around the depth canvas and draw bounding box
    if (prevProps.tools.currentTool !== tools.currentTool && tools.currentTool) {
      if (SelectionBox[tools.currentTool].type === "boundingBox") {
        depthCanvas.addEventListener("click", this.drawBoundingBox);
      } else {
        depthCanvas.style.cursor = "default";
        depthCanvas.removeEventListener("click", this.drawBoundingBox);
        storeParameters({
          croppedCanvasImage: null,
          croppedArea: null,
          histogramParams: {
            pixelRange: [0, 255],
            domain: [0, 255],
            values: [0, 255],
            update: [0, 255]
          }
        });
      }
    }
    if (prevProps.groundTools.currentTool !== groundTools.currentTool && groundTools.currentTool) {
      if (GroundBox[groundTools.currentTool].type === "boundingBox") {
        depthCanvas.addEventListener("click", this.drawBoundingBox);
      } else {
        depthCanvas.style.cursor = "default";
        depthCanvas.removeEventListener("click", this.drawBoundingBox);
      }
    }
  }
  componentWillUnmount() {
    let depthCanvas = this.rgbImageRef.current;
    window.removeEventListener("resize", this.handleResize);
    depthCanvas.removeEventListener("click", this.drawBoundingBox);
    URL.revokeObjectURL(objectUrl);
  }
  handleResize = () => {
    const { displayDepthCanvas, scribbleParams, depthScaleParams, parameters, initImage, storeScaleParams } =
      this.props;
    const { translatePos, scale } = depthScaleParams;
    const depthCanvas = this.rgbImageRef.current;
    this.setState({ ...this.state, windowWidth: window.innerWidth });
    if (depthCanvas && displayDepthCanvas) {
      depthCanvas.width = (window.innerWidth / 1500) * 521;
      depthCanvas.height = (window.innerHeight / 1200) * 352;
      const { ratio, centerShift_x, centerShift_y } = getRatio(displayDepthCanvas, depthCanvas);
      initImage({
        prevDepthSize: { width: depthCanvas.width, height: depthCanvas.height }
      });
      storeScaleParams({ name: "depthScaleParams", value: { ratio, centerShift_x, centerShift_y } });
      drawScaledCanvasImage(displayDepthCanvas, depthCanvas, ratio, centerShift_x, centerShift_y, scale, translatePos);
      if (parameters.croppedArea) {
        drawBox(
          depthCanvas,
          downScaleBox(parameters.croppedArea, ratio, centerShift_x, centerShift_y, translatePos, scale)
        );
      }
      if (Array.isArray(scribbleParams.path) || scribbleParams.path.length) {
        for (let i = 0; i < scribbleParams.path.length; i++) {
          drawScribble(
            depthCanvas.getContext("2d"),
            downScalePoint(scribbleParams.path[i].start, ratio, centerShift_x, centerShift_y, translatePos, scale),
            downScalePoint(scribbleParams.path[i].end, ratio, centerShift_x, centerShift_y, translatePos, scale)
          );
        }
      }
    }
  };
  drawBoundingBox = event => {
    let depthCanvas = this.rgbImageRef.current;
    let { initBoundingBox } = this.state;
    let { memoryDepthCanvas, depthScaleParams, storeParameters, tools, groundTools, storeGroundParams } = this.props;
    let { ratio, centerShift_x, centerShift_y, translatePos, scale } = depthScaleParams;
    if (memoryDepthCanvas) {
      let x = event.offsetX;
      let y = event.offsetY;
      if (initBoundingBox) {
        let depthCanvasDimension = getDimension(
          memoryDepthCanvas,
          ratio,
          centerShift_x,
          centerShift_y,
          translatePos,
          scale
        );
        let [image_x1, image_y1, image_x2, image_y2] = depthCanvasDimension;
        let new_x = Math.max(Math.min(initBoundingBox.x, x), image_x1);
        let new_y = Math.max(Math.min(initBoundingBox.y, y), image_y1);
        let new_w = Math.min(Math.max(initBoundingBox.x, x), image_x2) - new_x;
        let new_h = Math.min(Math.max(initBoundingBox.y, y), image_y2) - new_y;
        if (
          new_x >= image_x1 &&
          new_x <= image_x2 &&
          new_y >= image_y1 &&
          new_y <= image_y2 &&
          new_x + new_w <= image_x2 &&
          new_x + new_w >= image_x1 &&
          new_y + new_h <= image_y2 &&
          new_y + new_h >= image_y1
        ) {
          if (new_w !== 0 || new_w !== 0) {
            let croppedArea = upScaleBox(
              [new_x, new_y, new_w, new_h],
              ratio,
              centerShift_x,
              centerShift_y,
              translatePos,
              scale
            );
            this.setState({ initBoundingBox: null }, () => {
              depthCanvas.style.cursor = "default";
              if (tools.currentTool) {
                storeParameters({
                  croppedCanvasImage: cropCanvas(memoryDepthCanvas, croppedArea),
                  croppedArea: croppedArea
                });
              }
              if (groundTools.currentTool) {
                storeGroundParams({ rectangle: croppedArea });
              }
            });
          }
        }
      } else {
        this.setState({ initBoundingBox: { x, y } }, () => {
          depthCanvas.style.cursor = "crosshair";
          if (tools.currentTool) {
            storeParameters({
              croppedArea: null,
              histogramParams: {
                pixelRange: [0, 255],
                domain: [0, 255],
                values: [0, 255],
                update: [0, 255]
              }
            });
          }
          if (groundTools.currentTool) {
            storeGroundParams({ rectangle: null });
          }
        });
      }
    }
  };
  render() {
    const { rgbImageRef } = this;
    const {
      memoryDepthCanvas,
      rgbScaleParams,
      depthScaleParams,
      parameters,
      tools,
      groundTools,
      scribbleParams,
      groundParams,
      storeScribbleParams,
      storeScaleParams,
      storeParameters,
      storeGroundParams
    } = this.props;
    const depthCanvas = rgbImageRef.current;
    return (
      <ImageViewerStyle>
        <canvas
          width={(window.innerWidth / 1500) * 521}
          height={(window.innerHeight / 1200) * 352}
          ref={rgbImageRef}
          onMouseDown={e => {
            if (tools.currentTool || groundTools.currentTool) {
              if (
                (tools.currentTool && SelectionBox[tools.currentTool].type === "scribble") ||
                (groundTools.currentTool && GroundBox[groundTools.currentTool].type === "scribble")
              ) {
                const { croppedArea } = parameters;
                let { ratio, centerShift_x, centerShift_y, translatePos, scale } = depthScaleParams;
                let dimension = null;
                if (croppedArea) {
                  dimension = boxToDimension(croppedArea);
                } else {
                  dimension = getDimension(memoryDepthCanvas, ratio, centerShift_x, centerShift_y, translatePos, scale);
                }
                let [x, y] = getScribbleValues(
                  e.clientX - depthCanvas.offsetLeft,
                  e.clientY - depthCanvas.offsetTop,
                  dimension
                );
                storeScribbleParams({
                  pos: { x, y }
                });
              } else if (tools.currentTool && SelectionBox[tools.currentTool].type === "pan") {
                storeScaleParams({
                  name: "rgbScaleParams",
                  value: {
                    startDragOffset: {
                      x: e.clientX - rgbScaleParams.translatePos.x,
                      y: e.clientY - rgbScaleParams.translatePos.y
                    },
                    mouseDown: true
                  }
                });
                storeScaleParams({
                  name: "depthScaleParams",
                  value: {
                    startDragOffset: {
                      x: e.clientX - depthScaleParams.translatePos.x,
                      y: e.clientY - depthScaleParams.translatePos.y
                    },
                    mouseDown: true
                  }
                });
              }
            }
          }}
          onMouseUp={e => {
            if (tools.currentTool || groundTools.currentTool) {
              if (
                (tools.currentTool && SelectionBox[tools.currentTool].type === "scribble") ||
                (groundTools.currentTool && GroundBox[groundTools.currentTool].type === "scribble")
              ) {
                if (Array.isArray(scribbleParams.path) || scribbleParams.path.length) {
                  if (tools.currentTool) {
                    let range = getScribbleRange(memoryDepthCanvas, scribbleParams.path);
                    storeParameters({
                      histogramParams: {
                        ...parameters.histogramParams,
                        pixelRange: range
                      }
                    });
                  }
                  if (groundTools.currentTool) {
                    storeGroundParams({ path: scribblePathConverter(scribbleParams.path, groundParams.rectangle) });
                  }
                }
              } else if (tools.currentTool && SelectionBox[tools.currentTool].type === "pan") {
                rgbScaleParams.mouseDown && storeScaleParams({ name: "rgbScaleParams", value: { mouseDown: false } });
                depthScaleParams.mouseDown &&
                  storeScaleParams({ name: "depthScaleParams", value: { mouseDown: false } });
              }
            }
          }}
          onMouseOver={e => {
            if (tools.currentTool || groundTools.currentTool) {
              if (
                (tools.currentTool && SelectionBox[tools.currentTool].type === "scribble") ||
                (groundTools.currentTool && GroundBox[groundTools.currentTool].type === "scribble")
              ) {
              } else if (tools.currentTool && SelectionBox[tools.currentTool].type === "pan") {
                rgbScaleParams.mouseDown && storeScaleParams({ name: "rgbScaleParams", value: { mouseDown: false } });
                depthScaleParams.mouseDown &&
                  storeScaleParams({ name: "depthScaleParams", value: { mouseDown: false } });
              }
            }
          }}
          onMouseOut={e => {
            if (tools.currentTool || groundTools.currentTool) {
              if (
                (tools.currentTool && SelectionBox[tools.currentTool].type === "scribble") ||
                (groundTools.currentTool && GroundBox[groundTools.currentTool].type === "scribble")
              ) {
              } else if (tools.currentTool && SelectionBox[tools.currentTool].type === "pan") {
                rgbScaleParams.mouseDown && storeScaleParams({ name: "rgbScaleParams", value: { mouseDown: false } });
                depthScaleParams.mouseDown &&
                  storeScaleParams({ name: "depthScaleParams", value: { mouseDown: false } });
              }
            }
          }}
          onMouseEnter={e => {
            if (tools.currentTool || groundTools.currentTool) {
              if (
                (tools.currentTool && SelectionBox[tools.currentTool].type === "scribble") ||
                (groundTools.currentTool && GroundBox[groundTools.currentTool].type === "scribble")
              ) {
                const { croppedArea } = parameters;
                let { ratio, centerShift_x, centerShift_y, translatePos, scale } = depthScaleParams;
                let dimension = null;
                if (croppedArea) {
                  dimension = boxToDimension(croppedArea);
                } else {
                  dimension = getDimension(memoryDepthCanvas, ratio, centerShift_x, centerShift_y, translatePos, scale);
                }
                let [x, y] = getScribbleValues(
                  e.clientX - depthCanvas.offsetLeft,
                  e.clientY - depthCanvas.offsetTop,
                  dimension
                );
                storeScribbleParams({
                  pos: { x, y }
                });
              } else if (tools.currentTool && SelectionBox[tools.currentTool].type === "pan") {
              }
            }
          }}
          onMouseMove={e => {
            if (tools.currentTool || groundTools.currentTool) {
              if (
                (tools.currentTool && SelectionBox[tools.currentTool].type === "scribble") ||
                (groundTools.currentTool && GroundBox[groundTools.currentTool].type === "scribble")
              ) {
                if (e.buttons !== 1) return;
                const { croppedArea } = parameters;
                let { ratio, centerShift_x, centerShift_y, translatePos, scale } = depthScaleParams;
                let dimension = null;
                if (croppedArea) {
                  dimension = boxToDimension(croppedArea);
                } else {
                  dimension = getDimension(memoryDepthCanvas, ratio, centerShift_x, centerShift_y, translatePos, scale);
                }
                let [x, y] = getScribbleValues(
                  e.clientX - depthCanvas.offsetLeft,
                  e.clientY - depthCanvas.offsetTop,
                  dimension
                );
                const depthContext = depthCanvas.getContext("2d");
                let start = { x: scribbleParams.pos.x, y: scribbleParams.pos.y };
                let end = { x, y };
                drawScribble(depthContext, start, end);
                storeScribbleParams({
                  pos: { x, y },
                  path: [
                    ...scribbleParams.path,
                    {
                      start: upScalePoint(start, ratio, centerShift_x, centerShift_y, translatePos, scale),
                      end: upScalePoint(end, ratio, centerShift_x, centerShift_y, translatePos, scale)
                    }
                  ]
                });
              } else if (tools.currentTool && SelectionBox[tools.currentTool].type === "pan") {
                if (depthScaleParams.mouseDown) {
                  storeScaleParams({
                    name: "rgbScaleParams",
                    value: {
                      translatePos: {
                        x: e.clientX - rgbScaleParams.startDragOffset.x,
                        y: e.clientY - rgbScaleParams.startDragOffset.y
                      }
                    }
                  });
                  storeScaleParams({
                    name: "depthScaleParams",
                    value: {
                      translatePos: {
                        x: e.clientX - depthScaleParams.startDragOffset.x,
                        y: e.clientY - depthScaleParams.startDragOffset.y
                      }
                    }
                  });
                }
              }
            }
          }}
        ></canvas>
      </ImageViewerStyle>
    );
  }
}

const mapStateToProps = state => ({
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  mainDepthCanvas: imageSelectors.mainDepthCanvas(state),
  displayDepthCanvas: imageSelectors.displayDepthCanvas(state),
  memoryDepthCanvas: imageSelectors.memoryDepthCanvas(state),
  isEffectNew: imageSelectors.isEffectNew(state),
  prevDepthSize: imageSelectors.prevDepthSize(state),
  scribbleParams: imageSelectors.scribbleParams(state),
  groundParams: imageSelectors.groundParams(state),
  rgbScaleParams: imageSelectors.rgbScaleParams(state),
  depthScaleParams: imageSelectors.depthScaleParams(state),
  tools: imageSelectors.tools(state),
  groundTools: imageSelectors.groundTools(state),
  toolsParameters: imageSelectors.toolsParameters(state),
  parameters: imageSelectors.parameters(state),
  operationStack: imageSelectors.operationStack(state)
});

const mapDispatchToProps = {
  initImage: imageActions.initImage,
  initDepth: imageActions.initDepth,
  initLayer: imageActions.initLayer,
  storeScribbleParams: imageActions.storeScribbleParams,
  storeScaleParams: imageActions.storeScaleParams,
  storeParameters: imageActions.storeParameters,
  storeGroundParams: imageActions.storeGroundParams,
  addOperation: imageActions.addOperation,
  addEffect: imageActions.addEffect
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);
