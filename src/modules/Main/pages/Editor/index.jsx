import React from "react";
import { connect } from "react-redux";
import { imageActions } from "store/image";
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

const Editor = ({ rgbImageUrl, depthImageUrl, parameters, storeParameters }) => {
  const [tempParameters, setTempParameters] = React.useState(parameters);
  const onHandleChange = (name, value) => {
    setTempParameters({ ...tempParameters, [name]: value });
  };
  const onHandleUpdate = (name, value) => {
    storeParameters({ [name]: value });
  };
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
          <Button w="60%" variant="primary" size="md">
            Apply
          </Button>
        </Flex>
      </Flex>
    </EditorStyle>
  );
};

const mapStateToProps = state => ({
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  depthImageUrl: imageSelectors.depthImageUrl(state),
  parameters: imageSelectors.parameters(state)
});

const mapDispatchToProps = {
  storeParameters: imageActions.storeParameters
  // toggleDarkMode: themeActions.toggleDarkMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
