import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./homepage.css";
import Header from "../header/header.js";
import ProminentAppBar from "../header_ui/header_ui.js";
import Logo from "../logo/logo.js";
import Participants from "../participants/participants";

function Homepage() {
  return (
    <div>
      <ProminentAppBar />
      <Logo />
      <Participants />
      {/*<Router>
        <Switch>
          <Route exactpath="/" Component={Participants} />
          <Route path="/par" Component={Participants} />
        </Switch>
      </Router>*/}
    </div>
  );
}
export default Homepage;
