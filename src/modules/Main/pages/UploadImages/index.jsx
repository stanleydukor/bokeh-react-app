import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Flex, Box, Text } from "@chakra-ui/react";
import PictureInput from "components/PictureInput";
import UploadImagesStyle from "./style";

const UploadImages = () => {
  return (
    <UploadImagesStyle>
      <Helmet>
        <title>Bokehian Rhapsody - Upload Images</title>
      </Helmet>
      <Flex alignItems="center" justifyContent="center" padding="20px">
        <Box w="521px" maxW="100%">
          <Flex flexDirection="column">
            <Text variant="header" size="xl">
              Upload Images
            </Text>
            <Text size="sm" mt="10px" mb="37px">
              You will need an rgb image and its equivalent depth map.
            </Text>
            <Box mb="30px">
              <PictureInput id="rgbImageUrl" text="Click to upload rgb image" />
            </Box>
            <Box>
              <PictureInput id="depthImageUrl" text="Click to upload depth image" />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </UploadImagesStyle>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
