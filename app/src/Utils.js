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
  getActivePaymentLink: function (prices) {
    let key;
    const keys = Object.keys(prices);
    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      if (prices[key].active == 1) {
        return prices[key].url;
      }
    }
    return Constants.prodPath;
  },
  buildReplacingObjectMail: function buildReplacingObjectMail(
    userValues,
    paymentLink,
    userSadnas
  ) {
    let veganHebrew;
    if (userValues.vegan == "0") {
      veganHebrew = "לא";
    } else {
      veganHebrew = "כן";
    }

    const toReplace = {
      _kenesdate_: Constants.kenesDate,
      _firstname_: userValues.Fname,
      _lastname_: userValues.Lname,
      _email_: userValues.email,
      _tel_: userValues.phone,
      _city_: userValues.city,
      _vegen_: userValues.vegan == "0" ? "לא" : "כן",
      _helpmail_: Constants.helpMail,
      _mirimail_: Constants.helpMail,
      _paymentlink_: paymentLink,
      _sad1_: userSadnas[0].descr,
      _sad2_: userSadnas[1].descr,
      _sad3_: userSadnas[2].descr,
      _gift_: "אין",
    };
    return toReplace;
  },
};

export default Utils;
