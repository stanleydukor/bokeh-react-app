import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import LandingStyle from "./style";
import animationData from "assets/lottie/main.json";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <LandingStyle>
      <Helmet>
        <title>Blur App - Landing</title>
      </Helmet>
      <Flex flexDirection="column" alignItems="center" marginX="20px">
        <Text textAlign="center" variant="header" size="xl">
          Bokehian Rhapsody
        </Text>
        <Text textAlign="center" size="md">
          Creating amazing bokeh effects in real time.
        </Text>
        <Box width="300px" height="300px">
          <Lottie options={defaultOptions} />
        </Box>
        <Flex justifyContent="flex-end">
          <Button variant="primary" size="xl">
            Get Started
          </Button>
        </Flex>
      </Flex>
    </LandingStyle>
  );
};

const mapStateToProps = state => ({
  // test: testSelectors.test(state),
  // users: testSelectors.users(state)
});

const mapDispatchToProps = {
  // testActions: testActions.test,
  // toggleDarkMode: themeActions.toggleDarkMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
