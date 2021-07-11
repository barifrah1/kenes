import React, { Component } from "react";
import { BrowserRouter , Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import Homepage from "./components/homepage/homepage.js";
import "./App.css";
import ProminentAppBar from "./components/header_ui/header_ui.js";
import Logo from "./components/logo/logo.js";
import Participants from "./components/participants/participants";
import Registeration from "./components/registeration/registeration";
class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res.express }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("http://mecreativenlp.com/kenesklafim/api/hello");
    const body = await response.json();
    console.log('xxx',body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return(
    <>
    <ProminentAppBar />
    <Logo />
    <BrowserRouter basename="/kenesklafim">
    <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/participants">Will Match</Link></li>
          <li><Link to="/register">Will Not Match</Link></li>
          <li><Link to="/kenesklafim">Also Will Not Match</Link></li>
      </ul>
          <Route path="/participants" component={Participants} />
          <Route path="/register" component={Registeration} />
          <Route exact path="/" component={Homepage}/>
    </BrowserRouter>
  </>
    );
  }
}

export default App;
