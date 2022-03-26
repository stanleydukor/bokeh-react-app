import React from "react";
import { Box, Button, Flex, Text, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon, AddIcon, HamburgerIcon } from "@chakra-ui/icons";
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
          {/* <Button variant="secondary" ml="14px" className="no-mobile">
            Login
          </Button>
          <Button leftIcon={<AddIcon w="10px" h="10px" />} variant="primary" ml="14px" className="no-mobile">
            Join Wisha
          </Button>
          <IconButton variant="secondary" ml="14px" icon={<HamburgerIcon />} className="no-web" /> */}
        </Box>
      </Flex>
    </NavbarStyle>
  );
}
