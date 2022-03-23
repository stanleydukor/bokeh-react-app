import React, { Suspense } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Loading from "components/Loading";
import { onboardingRoutes } from "routes/routes-list";

const Landing = React.lazy(() => import("./pages/Landing"));

const Onboarding = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={`${path}`} render={props => <Landing {...props} />} />
        <Redirect to={`${path}`} />
      </Switch>
    </Suspense>
  );
};

export default Onboarding;
