import React, { Component, useEffect, useState, useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import Homepage from "./components/Homepage/Homepage.js";
import "./App.css";
import ProminentAppBar from "./components/header_ui/header_ui.js";
import Logo from "./components/logo/logo.js";
import Participants from "./components/Participants/Participants";
import Registeration from "./components/Registeration/Registeration";
import LoginButton from "./components/LoginButton/LoginButton";
import Login from "./components/Login/Login";
import useWindow from "./components/useWindow/useWindow";
import { withAuthenticationRequired } from "@auth0/auth0-react";
const callApi = async () => {
  const response = await fetch("/api/hello");
  const body = await response.json();
  console.log("xxx", body);
  if (response.status !== 200) throw Error(body.message);

  return body;
};

const handleSubmit = async (e, post, setResponseToPost) => {
  e.preventDefault();
  const response = await fetch("/api/world", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: post }),
  });
  const body = await response.text();

  setResponseToPost(body);
};

const App = (props) => {
  const [response, setResponse] = useState("");
  const [post, setPost] = useState("");
  const [responseToPost, setResponseToPost] = useState("");
  const { height, width } = useWindow();
  useEffect(() => {
    callApi()
      .then((res) => setResponse(res.express))
      .catch((err) => console.log(err));
  }, []);
  const AuthParticipants = withAuthenticationRequired(Participants, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
  return (
    <>
      <ProminentAppBar />
      <Logo />
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/participants">Will Match</Link>
          </li>
          <li>
            <Link to="/register">Will Not Match</Link>
          </li>
          <li>
            <Link to="/kenesklafim">Also Will Not Match</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/participants" component={AuthParticipants} />

          <Route path="/register" component={Registeration} />
          <Route exact path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
