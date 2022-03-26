import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import FooterStyle from "./style";

export default function Footer() {
  return (
    <FooterStyle>
      <Flex h="60px" px="30px" bg="transparent" alignItems="center" justifyContent="center">
        <Text size="xxs">CMPT 769 Project 2022</Text>
      </Flex>
    </FooterStyle>
  );
}
