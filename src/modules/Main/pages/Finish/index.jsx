import React from "react";
import { connect } from "react-redux";
import { selectors as imageSelectors } from "store/image";
import { Helmet } from "react-helmet";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import FinishStyle from "./style";
import history from "routes/history";
import { canvasToImage, downloadCanvas } from "utils/canvasUtils";

const Finish = ({ rgbImageUrl, depthImageUrl, displayRgbCanvas }) => {
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
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  depthImageUrl: imageSelectors.depthImageUrl(state),
  displayRgbCanvas: imageSelectors.displayRgbCanvas(state)
});

export default connect(mapStateToProps, null)(Finish);
