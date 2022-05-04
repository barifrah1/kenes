import React from "react";
import { Layout } from "antd";
import "./Header.less";
function Header(props) {
  const { Header } = Layout;
  return (
    <>
      <Header
        className={props.type === "main" ? "head_bar" : "head_bar_modal"}
      />
      {/* // <div className={props.type === "main" ? "headbar" : "headbarmodal"}></div>
      <Logo className="logo_centered" /> */}
    </>
  );
}
export default Header;
