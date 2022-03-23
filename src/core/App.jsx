import React, { Component, Suspense } from "react";
import { Route, Router as BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectors as themeSelectors } from "store/theme";
import history from "routes/history";
import { defaultRoute, mainRoutes } from "routes/routes-list";
import Navbar from "components/Navbar";
import Error from "components/Error";
import Loading from "components/Loading";
import Onboarding from "modules/Onboarding";
import Main from "modules/Main";

class App extends Component {
  state = {
    noInternetConnection: false
  };
  componentDidMount() {
    this.handleInternetConnectionChange();
    window.addEventListener("online", this.handleInternetConnectionChange);
    window.addEventListener("offline", this.handleInternetConnectionChange);
  }
  handleInternetConnectionChange = () => {
    navigator.onLine ? this.setState({ noInternetConnection: false }) : this.setState({ noInternetConnection: true });
  };
  render() {
    const { noInternetConnection } = this.state;
    const { darkMode } = this.props;
    if (noInternetConnection) {
      return <Error text="No Internet Connnection" />;
    }
    return (
      <>
        <Suspense fallback={<Loading />}>
          <BrowserRouter history={history}>
            <Navbar />
            <Switch>
              <Route path={[mainRoutes.app]} component={Main} />
              <Route path={[defaultRoute]} component={Onboarding} />
              <Redirect to={defaultRoute} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = state => ({
  darkMode: themeSelectors.theme(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
