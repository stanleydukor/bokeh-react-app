import React from "react";
import { Select } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import * as Colors from "theme/colors";

export default function Options(props) {
  return (
    <Select
      {...props}
      defaultValue="select"
      h="57px"
      marginBottom="13px"
      focusBorderColor="none"
      border="none"
      bg={useColorModeValue(Colors.white[500], Colors.black[100])}
    >
      <option value="select" disabled>
        Select
      </option>
      {props.data.map((o, i) => {
        return (
          <option value={o.value} key={i}>
            {o.name}
          </option>
        );
      })}
    </Select>
  );
}
