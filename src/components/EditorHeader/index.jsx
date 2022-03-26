import React from "react";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import EditorHeaderStyle from "./style";

export default function EditorHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <EditorHeaderStyle>
      <Flex h="70px" px="20px" bg="transparent" alignItems="center" justifyContent="space-between">
        <IconButton variant="primary" icon={<ArrowBackIcon />} />
        <IconButton variant="primary" icon={<ArrowForwardIcon />} />
      </Flex>
    </EditorHeaderStyle>
  );
}
