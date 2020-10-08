import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./homepage.css";
import Header from "../header/header.js";
import ProminentAppBar from "../header_ui/header_ui.js";
import Logo from "../logo/logo.js";
import Participants from "../participants/participants";
import Registeration from "../registeration/registeration";

function Homepage() {
  return (
    <div>
      <ProminentAppBar />
      <Logo />
      <Router>
        <div>
          <Switch>
            <Route path="/participants" component={Participants} />
            <Route path="/register" component={Registeration} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default Homepage;
