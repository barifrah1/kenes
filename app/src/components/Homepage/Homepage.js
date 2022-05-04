import React from "react";
import { useHistory } from "react-router-dom";
import LoginButton from "../Login/LoginButton/LoginButton";
import LogoutButton from "../Login/LogoutButton/LogoutButton";
import "./Homepage.less";
import { Layout, Button, Typography, Space } from "antd";
// import CounterDown from "../CounterDown/CounterDown";
import KenesLogo from "./Header/KenesLogo/KenesLogo";
import PhotoCredit from "./PhotoCredit/PhotoCredit";
import SocialMedia from "./SocialMedia/SocialMedia";
import Registeration from "../Registeration/Registeration";
function Homepage(props) {
  const { Content, Footer } = Layout;
  const { Title } = Typography;
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };
  const { path } = props;

  return (
    <div className="homepage">
      <Content className="content_div">
        {path === "/" && (
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
                onClick={() => routeChange("register")}
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
        {path === "/register" && <Registeration />}
      </Content>
      <Footer className="footer">
        <div className="login_button">
          <LoginButton className="login" />
          <LogoutButton className="logout" />
        </div>
        {/* <CounterDown /> */}
        <SocialMedia />
      </Footer>
    </div>
  );
}
export default Homepage;
