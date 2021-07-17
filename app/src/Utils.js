import React, { Component } from "react";
import * as Constants from "./Constants";
const clientPort = 3000;
const serverPort = 7000;
const Utils = {
  resolvePath: function () {
    const url = window.location.href;
    const isLocalhost = url.includes("localhost");
    return isLocalhost ? Constants.localhostPath : Constants.prodPath;
  },
  checkPermissions: async function (userMail) {
    const result = await fetch(Utils.resolvePath() + "api/checkPermissions", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMail: userMail,
      }),
    }).then((res) => res.json());
    return result.length > 0;
  },
};

export default Utils;
