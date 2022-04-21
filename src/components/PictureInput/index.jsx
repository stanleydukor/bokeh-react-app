import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { imageActions } from "store/image";
import { selectors as imageSelectors } from "store/image";
import { Box, Flex, Text, IconButton, CloseButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import * as Colors from "theme/colors";
import PictureInputStyle from "./style";
import { canvasToImage } from "utils/canvasUtils";

const PictureInput = ({ id, text, labelProps, inputProps, handleChange, mainRgbCanvas, mainDepthCanvas }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const onHandleChange = e => {
    setFile(e.target.files[0]);
    handleChange(e);
    e.target.value = null;
  };
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  useEffect(() => {
    if (mainRgbCanvas && id === "rgbImageUrl") {
      setPreview(canvasToImage(mainRgbCanvas));
    }
    if (mainDepthCanvas && id === "depthImageUrl") {
      setPreview(canvasToImage(mainDepthCanvas));
    }
  }, []);
  return (
    <PictureInputStyle>
      <Flex
        className="picture-input"
        bg={useColorModeValue(Colors.white[500], Colors.black[300])}
        w="100%"
        h="100%"
        padding="18px 15px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          bg={preview ? "none" : useColorModeValue(Colors.white[300], Colors.black[200])}
          h="110px"
          w="110px"
          className="profile-image"
        >
          <label htmlFor={id} {...labelProps}>
            {preview ? <img src={preview} /> : <AddIcon h="30px" w="30px" />}
          </label>
          {preview && (
            <CloseButton
              className="close-button"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            />
          )}
        </Box>
        <Box flex="1">
          <Flex justifyContent="center" alignItems="center">
            <Text>
              {file
                ? file.name.split(".")[0].length < 11
                  ? `${file.name}`
                  : `${file.name.slice(0, 11)}...${file.name.split(".").pop()}`
                : text}
            </Text>
          </Flex>
          <input type="file" name={id} onChange={onHandleChange} id={id} {...inputProps} />
        </Box>
      </Flex>
    </PictureInputStyle>
  );
};

const mapStateToProps = state => ({
  mainRgbCanvas: imageSelectors.mainRgbCanvas(state),
  mainDepthCanvas: imageSelectors.mainDepthCanvas(state)
});

const mapDispatchToProps = {
  handleChange: imageActions.handleChange
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureInput);
