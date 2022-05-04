import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage.js";
import "./App.less";
import Participants from "./components/Participants/Participants";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// const callApi = async () => {
//   const response = await fetch("/api/hello");
//   const body = await response.json();
//   console.log("xxx", body);
//   if (response.status !== 200) throw Error(body.message);

//   return body;
// };

const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/participants" component={Participants} />
          <Route
            path="/register"
            render={() => <Homepage path="/register" />}
          />
          <Route exact path="/" render={() => <Homepage path="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

const PrivateRoute = (props) => {
  const { path, component } = props;
  const AuthRoute = withAuthenticationRequired(component, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
  return <Route path={path} component={AuthRoute} />;
};

export default App;
