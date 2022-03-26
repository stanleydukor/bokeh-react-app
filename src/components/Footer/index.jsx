import React from "react";
import { Box, Button, Flex, Text, IconButton, useColorMode } from "@chakra-ui/react";
import FooterStyle from "./style";

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FooterStyle>
      <Flex h="80px" px="30px" bg="transparent" alignItems="center" justifyContent="center">
        <Text size="xs">CMPT 769 Project 2022</Text>
      </Flex>
    </FooterStyle>
  );
}
