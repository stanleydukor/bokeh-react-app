import React, { Suspense } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Loading from "components/Loading";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { onboardingRoutes } from "routes/routes-list";

const Landing = React.lazy(() => import("./pages/Landing"));

const Onboarding = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Switch>
        <Route path={`${path}`} render={props => <Landing {...props} />} />
        <Redirect to={`${path}`} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Onboarding;
