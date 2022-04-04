import React from "react";
import logo from "../assets/images/logo.png";
import "../assets/styles/components/authHeader.scss";

const AuthHeader = () => {
  return (
    <div className="authHeader">
      <div className={"logo"}>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default AuthHeader;
