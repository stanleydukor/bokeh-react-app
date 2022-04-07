import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton, CloseButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import * as Colors from "theme/colors";
import PictureInputStyle from "./style";

export default function PictureInput({ id, text, labelProps, inputProps }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = e => {
    setFile(e.target.files[0]);
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
          bg={file ? "none" : useColorModeValue(Colors.white[300], Colors.black[200])}
          h="110px"
          w="110px"
          className="profile-image"
        >
          <label htmlFor={id} {...labelProps}>
            {file ? <img src={preview} /> : <AddIcon h="30px" w="30px" />}
          </label>
          {file && (
            <CloseButton
              className="close-button"
              onClick={() => {
                setFile(null);
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
          <input type="file" value="" onChange={handleChange} id={id} {...inputProps} />
        </Box>
      </Flex>
    </PictureInputStyle>
  );
}
