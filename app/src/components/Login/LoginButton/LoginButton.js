import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import "./LoginButton.less";
function LoginButton() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") == "unauthorized") {
      logout({ returnTo: window.location.origin });
    }
  }, [isAuthenticated]);
  return (
    !isAuthenticated && (
      <Tooltip
        className="login"
        title="התחבר"
        color="primary-color"
        placement="bottom"
      >
        <Button
          type="link"
          icon={<LoginOutlined className="login_icon" />}
          onClick={() =>
            loginWithRedirect({
              redirect_uri: window.location.origin + "/participants",
            })
          }
        ></Button>
      </Tooltip>
    )
  );
}

export default LoginButton;
