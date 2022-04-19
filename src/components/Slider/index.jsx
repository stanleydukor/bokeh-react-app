import React from "react";
import { Flex, Box, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip } from "@chakra-ui/react";
import * as Colors from "theme/colors";

export default function SliderThumbWithTooltip({ text, sliderProps, onHandleChange, onHandleUpdate }) {
  const [sliderValue, setSliderValue] = React.useState(sliderProps.value);
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <Flex my="10px" w="100%" alignItems="center">
      <Box w={["80px", "110px", "130px", "150px"]}>
        <Text textAlign="left" fontSize={["10px", "16px", "18px", "20px"]}>
          {text}
        </Text>
      </Box>
      <Box flex="1">
        <Slider
          {...sliderProps}
          onChange={v => {
            onHandleChange(sliderProps.name, v);
            setSliderValue(v);
          }}
          onChangeEnd={v => onHandleUpdate(sliderProps.name, v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderTrack bg={Colors.blue[200]}>
            <SliderFilledTrack bg={Colors.blue[100]} />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg={Colors.blue[100]}
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${sliderValue}%`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
      <Box w={["30px", "40px", "60px", "80px"]}>
        <Text textAlign="right" fontSize={["10px", "16px", "18px", "20px"]}>
          {sliderValue}
        </Text>
      </Box>
    </Flex>
  );
}
