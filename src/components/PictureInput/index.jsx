import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
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
      >
        <Box h="110px" w="110px" className="profile-image">
          {file ? <img src={preview} /> : <img src="https://via.placeholder.com/150" />}
        </Box>
        <Box flex="1">
          <label style={{ display: file ? "none" : "flex" }} htmlFor={id} {...labelProps}>
            <Flex>
              <AddIcon h="22.75px" w="17.33px" />
              <Text ml="10px">{text}</Text>
            </Flex>
          </label>
          <div style={{ display: file ? "flex" : "none" }} className="file">
            <Flex justifyContent="center" alignItems="center">
              <Text>
                {file &&
                  (file.name.split(".")[0].length < 11
                    ? `${file.name}`
                    : `${file.name.slice(0, 11)}...${file.name.split(".").pop()}`)}
              </Text>
              <IconButton
                ml="5px"
                variant="ghost"
                onClick={() => {
                  setFile(null);
                }}
                icon={<CloseIcon h="15px" w="15px" />}
              />
            </Flex>
          </div>
          <input type="file" value="" onChange={handleChange} id={id} {...inputProps} />
        </Box>
      </Flex>
    </PictureInputStyle>
  );
}
