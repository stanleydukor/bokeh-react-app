import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Flex, Box, Text, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Field from "components/Field";
import LandingStyle from "./style";

const Landing = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  return (
    <LandingStyle>
      <Helmet>
        <title>Wisha - Landing</title>
      </Helmet>
      <Flex flexDirection="column">
        <Text variant="header" size="xl">
          Landing
        </Text>
        <Text size="md" mb="37px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Box>
          <Field type="email" placeholder="Email Address" />
          <InputGroup>
            <Field pr="4.5rem" type={showPassword ? "text" : "password"} placeholder="Password" />
            <InputRightElement h="57px" width="4.5rem">
              <IconButton
                variant="ghost"
                h="1.75rem"
                onClick={handleClick}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex justifyContent="flex-end" mt="47px">
          <Button variant="primary" size="xl">
            Landing
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
