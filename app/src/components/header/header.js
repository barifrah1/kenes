import React, { Component } from "react";
import "./header.css";
import Logo from "../logo/logo.js";
function Header(props) {
  return (
    <>
      <div className={props.type === "main" ? "headbar" : "headbarmodal"}></div>
      <Logo className="logo_centered" />
    </>
  );
}
export default Header;
