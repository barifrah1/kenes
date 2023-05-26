import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "./GetRegCount.less";
import Swal from "sweetalert2";
import AsyncAjax from "../../../AsyncAjax";
function GetRegCount() {
  const { getAccessTokenSilently } = useAuth0();
  const buttonStyle = {
    backgroundColor: 'lightblue',
    color: 'white',
  };
  return (
      <Tooltip
        className="GetRegCount"
        title=" כמות הנוכחים בכנס"
        color="primary-color"
        placement="bottom"
      >
        <Button
          style={buttonStyle}
          type="ghost"
          shape="round"
          className="get_count_button"
          onClick={() => {
            getAccessTokenSilently()
                .then(async (token) => {
                const res = await AsyncAjax.get(`participant/registerC`, {}, token);
                if (res) {
                  const intValue = parseInt(res[0].count); // Convert the response to an integer
                  console.log("Received integer value:", intValue);
                  Swal.fire({
                    title: "רשימת משתתפים מאופסת ",
                    text: `${intValue}`,
                    icon: "info",
                    confirmButtonText: "OK",
                  });
                }
            })
            .catch((error) => Swal.fire("שגיאה בטעינת המידע"));
          }}
        >
          איפוס רשימת נרשמים
        </Button>
      </Tooltip>
    );
}

export default GetRegCount;
