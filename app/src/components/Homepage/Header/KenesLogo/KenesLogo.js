import React from "react";
import Logo from "../../../../images/logo_klafim2.png";
import "./KenesLogo.less";
const KenesLogo = () => {
  return (
    <span className="kenes_logo">
      <img src={Logo} alt="logo" />
    </span>
  );
};
export default KenesLogo;
