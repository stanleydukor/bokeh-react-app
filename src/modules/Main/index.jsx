import React, { Suspense } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import EditorHeader from "components/EditorHeader";
import Loading from "components/Loading";
import { mainRoutes } from "routes/routes-list";

const UploadImages = React.lazy(() => import("./pages/UploadImages"));
const Editor = React.lazy(() => import("./pages/Editor"));
const Finish = React.lazy(() => import("./pages/Finish"));

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback={<Loading />}>
      <EditorHeader />
      <div style={{ height: "calc(100vh - 70px)" }}>
        <Switch>
          <Route path={`${path}${mainRoutes.complete}`} render={props => <Finish {...props} />} />
          <Route path={`${path}${mainRoutes.editor}`} render={props => <Editor {...props} />} />
          <Route path={`${path}${mainRoutes.uploadImages}`} render={props => <UploadImages {...props} />} />
          <Redirect to={`${path}${mainRoutes.uploadImages}`} />
        </Switch>
      </div>
    </Suspense>
  );
};

export default Main;
