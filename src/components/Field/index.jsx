import React from "react";
import { Input } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import * as Colors from "theme/colors";

export default function Field(props) {
  return (
    <Input
      {...props}
      h="57px"
      marginBottom="13px"
      focusBorderColor="none"
      border="none"
      _placeholder={{ color: useColorModeValue(Colors.white[400], Colors.black[400]) }}
      bg={useColorModeValue(Colors.white[500], Colors.black[100])}
    />
  );
}
