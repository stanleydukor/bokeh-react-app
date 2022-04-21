import React from "react";
import { Box, Flex, Text, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import NavbarStyle from "./style";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <NavbarStyle>
      <Flex h="85px" px="30px" bg="transparent" alignItems="center" justifyContent="space-between">
        <Text variant="header" size="md">
          Bokehian Rhapsody
        </Text>
        <Box>
          <IconButton
            variant="ghost"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
        </Box>
      </Flex>
    </NavbarStyle>
  );
}
