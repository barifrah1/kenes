import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") == "unauthorized") {
      logout({ returnTo: window.location.origin });
    }
  }, [isAuthenticated]);
  return (
    !isAuthenticated && (
      <button className="login" onClick={loginWithRedirect}>
        Log in
      </button>
    )
  );
}

export default LoginButton;
