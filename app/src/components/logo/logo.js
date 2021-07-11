import React, { Component } from "react";
import "./logo.css";

const Logo = (style) => {
  return (
    <img
      className={style.className === "logo_centered" ? "logo_centered" : "Logo"}
      src="public/images/logonlp.png"
    ></img>
  );
};
export default Logo;
