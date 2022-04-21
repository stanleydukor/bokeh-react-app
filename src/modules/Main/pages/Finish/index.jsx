import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { djangoActions } from "store/django";
import { imageActions } from "store/image";
import { selectors as djangoSelectors } from "store/django";
import { selectors as imageSelectors } from "store/image";
import { Helmet } from "react-helmet";
import { Flex, Box, Text, Button, IconButton } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import FinishStyle from "./style";
import history from "routes/history";
import { canvasToImage, cloneCanvas, downloadCanvas, drawNewCanvasImage } from "utils/canvasUtils";

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const Finish = ({
  blurredImage,
  isLoading,
  rgbImageUrl,
  depthImageUrl,
  displayRgbCanvas,
  mainDepthCanvas,
  parameters,
  storeParameters,
  addEffect,
  applyBlur,
  resetBlurredImage
}) => {
  const [isImageNew, setIsImageNew] = useState(true);
  const [tempParameters, setTempParameters] = useState(parameters);
  const onHandleChange = (name, value) => {
    setTempParameters({ ...tempParameters, [name]: value });
  };
  const onHandleUpdate = (name, value) => {
    storeParameters({ [name]: value });
  };
  useEffect(() => {
    if (blurredImage) {
      setIsImageNew(false);
      let image = new Image();
      image.src = "data:image/png;base64," + arrayBufferToBase64(blurredImage);
      image.onload = () => {
        addEffect({
          func: drawNewCanvasImage,
          params: [cloneCanvas(image)]
        });
      };
    } else {
      setIsImageNew(true);
    }
  }, [blurredImage]);
  useEffect(() => {
    resetBlurredImage();
  }, [rgbImageUrl, depthImageUrl]);
  if (!rgbImageUrl || !depthImageUrl) {
    history.push("/app/upload-images");
    window.location.reload();
  }
  return (
    <FinishStyle>
      <Helmet>
        <title>Bokehian Rhapsody - Finish</title>
      </Helmet>
      <Flex alignItems="center" justifyContent="center" padding="20px">
        <Box w="521px" maxW="100%">
          <Flex flexDirection="column">
            <Box className="titleBox" mb="20px">
              <BsCheckCircle />
              <Text textAlign="center" variant="header" size="lg" mt="10px">
                Complete
              </Text>
            </Box>
            <Box className="imageBox" textAlign="center">
              <img src={canvasToImage(displayRgbCanvas)} />
            </Box>
            <Box textAlign="center" mt="37px">
              <Button
                onClick={() => {
                  downloadCanvas(displayRgbCanvas, "bokeh_image.png");
                }}
                variant="primary"
                size="xl"
              >
                Download Image
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </FinishStyle>
  );
};

const mapStateToProps = state => ({
  blurredImage: djangoSelectors.blurredImage(state),
  isLoading: djangoSelectors.isLoading(state),
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  depthImageUrl: imageSelectors.depthImageUrl(state),
  mainRgbCanvas: imageSelectors.mainRgbCanvas(state),
  displayRgbCanvas: imageSelectors.displayRgbCanvas(state),
  mainDepthCanvas: imageSelectors.mainDepthCanvas(state),
  parameters: imageSelectors.parameters(state)
});

const mapDispatchToProps = {
  storeParameters: imageActions.storeParameters,
  addEffect: imageActions.addEffect,
  applyBlur: djangoActions.applyBlur,
  resetBlurredImage: djangoActions.resetBlurredImage
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
