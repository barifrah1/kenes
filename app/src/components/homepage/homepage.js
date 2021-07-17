import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
function Homepage() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {/*<ProminentAppBar />
      <Logo />
      <Router>
        <div>
          <Switch>
            <Route path="/participants" component={Participants} />
            <Route path="/register" component={Registeration} />
          </Switch>
        </div>
      </Router>*/}
      checkdsdsfdf fdfdfdf fdfd
      <div>
        <LoginButton />
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
export default Homepage;
