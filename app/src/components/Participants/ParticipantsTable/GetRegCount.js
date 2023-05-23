import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "./GetRegCount.less";
import Swal from "sweetalert2";
function GetRegCount() {
  const { getAccessTokenSilently } = useAuth0();
  return (
      <Tooltip
        className="GetRegCount"
        title="נוכחים בכנס"
        color="primary-color"
        placement="bottom"
      >
        <Button
          type="ghost"
          shape="round"
          className="get_count_button"
          onClick={() => {
            getAccessTokenSilently()
                .then(async (token) => {
                const res = await AsyncAjax.get("participant/", {}, token);
                if (res) {
                  console.log('Received request:');
                }
            })
            .catch((error) => Swal.fire("שגיאה בטעינת המידע"));
          }}
        >
          נקלטו
        </Button>
      </Tooltip>
    );
}

export default GetRegCount;
