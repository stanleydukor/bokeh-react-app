import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import * as Colors from "theme/colors";
import ColorSchemeStyle from "./style";

const schemes = ["#6D5EEA", "black", "red", "yellow", "#FF7A00", "#28B2FF", "#FF28DD", "#C728FF"];

export default function ColorScheme() {
  const [activeColor, setActiveColor] = useState(null);
  return (
    <ColorSchemeStyle>
      <Text my="10px" size="xxs">
        Select color scheme
      </Text>
      <Box w="100%" minH="64px" margin="0">
        <Flex
          className="color-scheme-container"
          bg={useColorModeValue(Colors.white[500], Colors.black[300])}
          w="100%"
          h="100%"
          padding="7px 15px"
          flexWrap="wrap"
        >
          {schemes.map((scheme, key) => (
            <Box
              key={key}
              onClick={() => {
                setActiveColor(key);
              }}
              className="color-box"
              border={
                key === activeColor ? `2px solid ${useColorModeValue(Colors.black[300], Colors.white[500])}` : "none"
              }
              mx="5px"
              h="49px"
              w="51px"
              bg={scheme}
              borderRadius="6px"
            />
          ))}
        </Flex>
      </Box>
    </ColorSchemeStyle>
  );
}
