import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { imageActions } from "store/image";
import { selectors as imageSelectors } from "store/image";
import ImageViewerStyle from "./style";
import { getImageUrl } from "utils/generalUtils";
import { cloneCanvas, drawCanvasImage, getRatio, drawScaledCanvasImage, canvasResize } from "utils/canvasUtils";
import { runRgbOperations } from "utils/stackOperations";

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
  onInitImage = (id, imageUrl) => {
    let { initImage } = this.props;
    let image = new Image();
    objectUrl = getImageUrl(imageUrl);
    image.src = objectUrl;
    image.onload = () => {
      if (Math.max(image.height, image.width) > 1000) {
        image = canvasResize(image);
      }
      initImage({ name: id, value: cloneCanvas(image) });
    };
  };
  componentDidMount() {
    let { rgbImageUrl, depthImageUrl } = this.props;
    this.onInitImage("mainRgbCanvas", rgbImageUrl);
    this.onInitImage("mainDepthCanvas", depthImageUrl);
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(prevProps) {
    let { rgbImageRef } = this;
    let { mainRgbCanvas, displayRgbCanvas, scaleParams, operationStack, initImage, storeScaleParams, addEffect } =
      this.props;
    let rgbCanvas = rgbImageRef.current;
    if (prevProps.mainRgbCanvas !== mainRgbCanvas) {
      if (mainRgbCanvas) {
        const { ratio, centerShift_x, centerShift_y } = getRatio(mainRgbCanvas, rgbCanvas);
        initImage({
          prevRgbSize: { width: rgbCanvas.width, height: rgbCanvas.height }
        });
        storeScaleParams({ ratio, centerShift_x, centerShift_y });
        addEffect({
          func: drawCanvasImage
        });
      }
    }
    if (prevProps.operationStack.rgbStack !== operationStack.rgbStack) {
      if (mainRgbCanvas) {
        runRgbOperations(mainRgbCanvas);
      }
    }
    if (prevProps.displayRgbCanvas !== displayRgbCanvas || prevProps.scaleParams !== scaleParams) {
      if (displayRgbCanvas) {
        const { ratio, centerShift_x, centerShift_y, translatePos, scale } = scaleParams;
        drawScaledCanvasImage(displayRgbCanvas, rgbCanvas, ratio, centerShift_x, centerShift_y, scale, translatePos);
      } else {
        let rgbContext = rgbCanvas.getContext("2d");
        rgbContext.clearRect(0, 0, rgbCanvas.width, rgbCanvas.height);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    URL.revokeObjectURL(objectUrl);
  }
  handleResize = () => {
    const { displayRgbCanvas, scaleParams, initImage, storeScaleParams } = this.props;
    const { translatePos, scale } = scaleParams;
    const rgbCanvas = this.rgbImageRef.current;
    this.setState({ ...this.state, windowWidth: window.innerWidth });
    if (rgbCanvas && displayRgbCanvas) {
      rgbCanvas.width = (window.innerWidth / 1500) * 800;
      rgbCanvas.height = (window.innerHeight / 1200) * 500;
      const { ratio, centerShift_x, centerShift_y } = getRatio(displayRgbCanvas, rgbCanvas);
      initImage({
        prevRgbSize: { width: rgbCanvas.width, height: rgbCanvas.height }
      });
      storeScaleParams({ ratio, centerShift_x, centerShift_y });
      drawScaledCanvasImage(displayRgbCanvas, rgbCanvas, ratio, centerShift_x, centerShift_y, scale, translatePos);
    }
  };
  render() {
    const { rgbImageRef } = this;
    const { scaleParams, storeScaleParams } = this.props;
    return (
      <ImageViewerStyle>
        <canvas
          width={(window.innerWidth / 1500) * 800}
          height={(window.innerHeight / 1200) * 500}
          ref={rgbImageRef}
          onMouseDown={e => {
            storeScaleParams({
              startDragOffset: {
                x: e.clientX - rgbScaleParams.translatePos.x,
                y: e.clientY - rgbScaleParams.translatePos.y
              },
              mouseDown: true
            });
          }}
          onMouseUp={e => {
            scaleParams.mouseDown && storeScaleParams({ mouseDown: false });
          }}
          onMouseOver={e => {
            scaleParams.mouseDown && storeScaleParams({ mouseDown: false });
          }}
          onMouseOut={e => {
            scaleParams.mouseDown && storeScaleParams({ mouseDown: false });
          }}
          onMouseEnter={e => {}}
          onMouseMove={e => {
            if (scaleParams.mouseDown) {
              storeScaleParams({
                translatePos: {
                  x: e.clientX - rgbScaleParams.startDragOffset.x,
                  y: e.clientY - rgbScaleParams.startDragOffset.y
                }
              });
            }
          }}
        ></canvas>
      </ImageViewerStyle>
    );
  }
}

const mapStateToProps = state => ({
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  depthImageUrl: imageSelectors.depthImageUrl(state),
  mainRgbCanvas: imageSelectors.mainRgbCanvas(state),
  displayRgbCanvas: imageSelectors.displayRgbCanvas(state),
  prevRgbSize: imageSelectors.prevRgbSize(state),
  scaleParams: imageSelectors.scaleParams(state),
  operationStack: imageSelectors.operationStack(state)
});

const mapDispatchToProps = {
  initImage: imageActions.initImage,
  storeScaleParams: imageActions.storeScaleParams,
  addEffect: imageActions.addEffect
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);
