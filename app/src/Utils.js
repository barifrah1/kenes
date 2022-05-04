
import * as Constants from "./Constants";
const Utils = {
  resolvePath: function () {
    const url = window.location.href;
    const isLocalhost = url.includes("localhost");
    return isLocalhost ? Constants.localhostPath : Constants.prodPath;
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
    let veganHebrew="לא";
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
