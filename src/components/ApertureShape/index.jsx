import React from "react";
import { connect } from "react-redux";
import { selectors as imageSelectors } from "store/image";
import { imageActions } from "store/image";
import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import * as Colors from "theme/colors";
import ApertureShapeStyle from "./style";

const schemes = { disk: "#6D5EEA", kite: "red", square: "yellow", triangle: "#28B2FF", trapezoid: "#FF28DD" };

function ApertureShape({ parameters, storeParameters }) {
  return (
    <ApertureShapeStyle>
      <Text my="10px" size="xxs">
        Select aperture shape
      </Text>
      <Box w="100%" minH="64px" margin="0">
        <Flex
          className="color-scheme-container"
          bg={useColorModeValue(Colors.white[500], Colors.black[300])}
          w="100%"
          h="100%"
          padding="7px 15px"
          flexWrap="wrap"
          justifyContent="center"
        >
          {Object.keys(schemes).map(scheme => (
            <Tooltip key={scheme} label={scheme} aria-label={scheme}>
              <Box
                onClick={() => {
                  storeParameters({ shape: scheme });
                }}
                className="color-box"
                border={
                  scheme === parameters.shape
                    ? `2px solid ${useColorModeValue(Colors.black[300], Colors.white[500])}`
                    : "none"
                }
                mx="5px"
                h="49px"
                w="51px"
                bg={schemes[scheme]}
                borderRadius="6px"
              />
            </Tooltip>
          ))}
        </Flex>
      </Box>
    </ApertureShapeStyle>
  );
}

const mapStateToProps = state => ({
  parameters: imageSelectors.parameters(state)
});

const mapDispatchToProps = {
  storeParameters: imageActions.storeParameters
};

export default connect(mapStateToProps, mapDispatchToProps)(ApertureShape);
