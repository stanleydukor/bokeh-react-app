import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import PictureInput from "components/PictureInput";
import ColorScheme from "components/ColorScheme";
import UploadImagesStyle from "./style";

const UploadImages = () => {
  return (
    <UploadImagesStyle>
      <Helmet>
        <title>Wisha - Upload Profile Picture</title>
      </Helmet>
      <Flex flexDirection="column">
        <Text variant="header" size="xl">
          Upload Profile Picture
        </Text>
        <Text size="md" mb="37px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Box>
          <PictureInput id="upload" />
          <ColorScheme />
        </Box>
        <Flex justifyContent="flex-end" mt="47px">
          <Button variant="ghost" size="sm">
            Skip
          </Button>
          <Button variant="primary" ml="10px" size="lg">
            Next
          </Button>
        </Flex>
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
