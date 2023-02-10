import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginButton from "../Login/LoginButton/LoginButton";
import LogoutButton from "../Login/LogoutButton/LogoutButton";
import { Layout, Button, Typography, Space } from "antd";
import KenesLogo from "./Header/KenesLogo/KenesLogo";
import PhotoCredit from "./PhotoCredit/PhotoCredit";
import SocialMedia from "./SocialMedia/SocialMedia";
import Registeration from "../Registeration/Registeration";
import "./Homepage.less";
function Homepage(props) {
  const [showRegisteration, setShowRegisteration] = useState(false);
  const { Content, Footer } = Layout;
  const { Title } = Typography;
  return (
    <div className="homepage">
      <Content className="content_div">
        <div className="login_button">
          <LoginButton className="login" />
          <LogoutButton className="logout" />
        </div>
        {!showRegisteration && (
          <>
            <KenesLogo />
            <Space direction="horizontal" className="titles">
              <Title level={4} className="secondary_title">
                27.10.22 מלון עדן אין, זכרון יעקב
              </Title>
              <Title level={1} className="main_title">
                כנס קלפים ביצירה ישראלית
              </Title>
            </Space>
            <div className="buttons">
              <Button
                className="registeration_button"
                type="primary"
                shape="round"
                onClick={
                  () => setShowRegisteration(true) /*routeChange("register")*/
                }
              >
                הרשמה
              </Button>
              <Button
                className="registeration_button ghost_button"
                type="ghost"
                shape="round"
              >
                מידע נוסף
              </Button>
            </div>
            <PhotoCredit />
          </>
        )}
        {showRegisteration && (
          <Registeration onClose={() => setShowRegisteration(false)} />
        )}
      </Content>
      <Footer className="footer">
        {/* <CounterDown /> */}
        <SocialMedia />
      </Footer>
    </div>
  );
}
export default Homepage;
