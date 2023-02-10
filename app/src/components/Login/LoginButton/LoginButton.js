import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import "./LoginButton.less";
function LoginButton() {
  const [toRender, setRender] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => setTimeout(() => setRender(true), 2000), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") == "unauthorized") {
      logout({ returnTo: window.location.origin });
    }
  }, [isAuthenticated]);
  return (
    <div>
      {!isAuthenticated && toRender && (
        <Tooltip
          className="login"
          title="התחבר"
          color="primary-color"
          placement="bottom"
        >
          <Button
            className="login_button"
            type="ghost"
            icon={<LoginOutlined className="login_icon" />}
            onClick={() =>
              loginWithRedirect({
                redirect_uri: window.location.origin + "/participants",
              })
            }
          >
            התחבר
          </Button>
        </Tooltip>
      )}
    </div>
  );
}

export default LoginButton;
