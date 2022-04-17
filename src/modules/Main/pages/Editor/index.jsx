import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Flex, Box, Text, Button, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import { ImUndo, ImRedo } from "react-icons/im";
import { FiCrop } from "react-icons/fi";
import { HiAdjustments } from "react-icons/hi";
import { RiBlurOffLine } from "react-icons/ri";
import EditorStyle from "./style";
import SliderThumbWithTooltip from "components/Slider";
import * as Colors from "theme/colors";

const Editor = () => {
  return (
    <EditorStyle>
      <Helmet>
        <title>Bokehian Rhapsody - Editor</title>
      </Helmet>
      <Flex className="image-viewer" alignItems="center" justifyContent="center" padding="20px">
        <Box h="100%" w="100%"></Box>
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
          <SliderThumbWithTooltip text="Focal Length" />
          <SliderThumbWithTooltip text="DoField" />
          <SliderThumbWithTooltip text="Blur Radius" />
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
  // test: testSelectors.test(state),
  // users: testSelectors.users(state)
});

const mapDispatchToProps = {
  // testActions: testActions.test,
  // toggleDarkMode: themeActions.toggleDarkMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
