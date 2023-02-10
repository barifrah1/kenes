import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "./LogoutButton.less";
function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Tooltip
        className="login"
        title="התנתק"
        color="primary-color"
        placement="bottom"
      >
        <Button
          className="logout_button"
          type="ghost"
          icon={<LogoutOutlined className="logout_icon" />}
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          התנתק
        </Button>
      </Tooltip>
    )
  );
}

export default LogoutButton;
