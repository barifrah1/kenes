import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tooltip } from "antd";
import Utils from "../../../Utils";
import "./ManagmentButton.less";
function ManagmentButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Tooltip
        className="login"
        title="ניהול"
        color="primary-color"
        placement="bottom"
      >
        <Button
          className="managment_button"
          type="ghost"
          onClick={() => {
            window.location.replace(Utils.resolvePath() + "participants");
          }}
        >
          ניהול
        </Button>
      </Tooltip>
    )
  );
}

export default ManagmentButton;
