import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage.js";
import "./App.less";
import Participants from "./components/Participants/Participants";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CheckIn from "./components/CheckIn/CheckIn.js";
import Example from "./components/Example";
import { string } from "yup";
// const callApi = async () => {
//   const response = await fetch("/api/hello");
//   const body = await response.json();
//   console.log("xxx", body);
//   if (response.status !== 200) throw Error(body.message);

//   return body;
// };

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/example" component={Example} />
          <PrivateRoute path="/participants" component={Participants} />
          <Route exact path="/" render={() => <Homepage />} />
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
