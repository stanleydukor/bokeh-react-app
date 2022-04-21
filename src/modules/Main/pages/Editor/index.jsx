import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { djangoActions } from "store/django";
import { imageActions } from "store/image";
import { selectors as djangoSelectors } from "store/django";
import { selectors as imageSelectors } from "store/image";
import { Helmet } from "react-helmet";
import { Flex, Box, Text, Button, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ImUndo, ImRedo } from "react-icons/im";
import { FiCrop } from "react-icons/fi";
import { HiAdjustments } from "react-icons/hi";
import { RiBlurOffLine } from "react-icons/ri";
import EditorStyle from "./style";
import SliderThumbWithTooltip from "components/Slider";
import * as Colors from "theme/colors";
import ImageViewer from "components/ImageViewer";
import history from "routes/history";
import { cloneCanvas, drawNewCanvasImage } from "utils/canvasUtils";

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const Editor = ({
  blurredImage,
  rgbImageUrl,
  depthImageUrl,
  mainRgbCanvas,
  mainDepthCanvas,
  parameters,
  storeParameters,
  addEffect,
  applyBlur
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
    }
  }, [blurredImage]);
  if (!rgbImageUrl || !depthImageUrl) {
    history.push("/app/upload-images");
    window.location.reload();
  }
  return (
    <EditorStyle>
      <Helmet>
        <title>Bokehian Rhapsody - Editor</title>
      </Helmet>
      <Flex className="image-viewer" alignItems="center" justifyContent="center" padding="20px">
        <Box h="100%" w="100%" bgColor={useColorModeValue(Colors.white[600], Colors.black[300])}>
          <ImageViewer />
        </Box>
      </Flex>
      <Flex className="editor-pane" flexDirection="column" alignItems="center" justifyContent="center" padding="20px">
        <Flex w="100%" alignItems="center" justifyContent="space-around">
          <Button fontWeight="200" fontSize={["10px", "14px"]} leftIcon={<ImUndo />} variant="ghost">
            Undo
          </Button>
          <Text textAlign="left" fontSize={["16px", "18px", "20px"]}>
            Blur
          </Text>
          <Button fontWeight="200" fontSize={["10px", "14px"]} rightIcon={<ImRedo />} variant="ghost">
            Redo
          </Button>
        </Flex>
        <Flex className="editor-pane-tools" flexDirection="column" alignItems="center" justifyContent="center">
          <SliderThumbWithTooltip
            text="Focal Length"
            sliderProps={{
              name: "focalLength",
              id: "focalLength",
              value: tempParameters.focalLength,
              min: 0,
              max: 1,
              step: 0.1
            }}
            onHandleChange={onHandleChange}
            onHandleUpdate={onHandleUpdate}
          />
          <SliderThumbWithTooltip
            text="DoField"
            sliderProps={{
              name: "DoF",
              id: "DoF",
              value: tempParameters.DoF,
              min: 0,
              max: 1,
              step: 0.1
            }}
            onHandleChange={onHandleChange}
            onHandleUpdate={onHandleUpdate}
          />
          <SliderThumbWithTooltip
            text="F/Stop"
            sliderProps={{
              name: "fStop",
              id: "fStop",
              value: tempParameters.fStop,
              min: 1.2,
              max: 22,
              step: 0.4
            }}
            onHandleChange={onHandleChange}
            onHandleUpdate={onHandleUpdate}
          />
        </Flex>
        <Flex w="100%" alignItems="center" justifyContent="space-evenly">
          <IconButton variant="ghost" icon={<FiCrop />} />
          <IconButton color={Colors.blue[100]} variant="ghost" icon={<HiAdjustments />} />
          <IconButton variant="ghost" icon={<RiBlurOffLine />} />
        </Flex>
        <Flex my="15px" w="100%" alignItems="center" justifyContent="center">
          <Button
            onClick={() => {
              let { focalLength, DoF, fStop } = parameters;
              let formData = new FormData();
              formData.append("rgb_image", canvasToImage(mainRgbCanvas));
              formData.append("depth_image", canvasToImage(mainDepthCanvas));
              formData.append("focal_length", focalLength);
              formData.append("dof", DoF);
              formData.append("f_stop", fStop);
              formData.append("is_image_new", isImageNew);
              applyBlur(formData);
            }}
            w="60%"
            variant="primary"
            size="md"
          >
            Apply
          </Button>
        </Flex>
      </Flex>
    </EditorStyle>
  );
};

const mapStateToProps = state => ({
  blurredImage: djangoSelectors.blurredImage(state),
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  depthImageUrl: imageSelectors.depthImageUrl(state),
  mainRgbCanvas: imageSelectors.mainRgbCanvas(state),
  mainDepthCanvas: imageSelectors.mainDepthCanvas(state),
  parameters: imageSelectors.parameters(state)
});

const mapDispatchToProps = {
  storeParameters: imageActions.storeParameters,
  addEffect: imageActions.addEffect,
  applyBlur: djangoActions.applyBlur
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
