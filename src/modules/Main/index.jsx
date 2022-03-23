import React, { Suspense } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Loading from "components/Loading";
import { Box, Flex } from "@chakra-ui/react";
import { mainRoutes } from "routes/routes-list";

const UploadImages = React.lazy(() => import("./pages/UploadImages"));

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback={<Loading />}>
      <Flex justifyContent="center" px="30px" marginTop="72px">
        <Box w="521px" maxW="100%">
          <Switch>
            <Route path={`${path}${mainRoutes.uploadImages}`} render={props => <UploadImages {...props} />} />
            <Redirect to={`${path}${mainRoutes.uploadImages}`} />
          </Switch>
        </Box>
      </Flex>
    </Suspense>
  );
};

export default Main;
