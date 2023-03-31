import { string } from "yup";
import * as Constants from "./Constants";
import { fecthingPrices } from "../src/components/Registeration/RegisterationHelpers";
const Utils = {
  resolvePath: function () {
    const url = window.location.href;
    const isLocalhost = url.includes("localhost");
    return isLocalhost ? Constants.localhostPath : Constants.prodPath;
  },

  getActivePaymentLink: function (prices, sug) {
    return fecthingPrices().then((kenesPrices) => {
      const ZOOM = 0;
      const FRONT = 1;
      let key;
      const priceZoom = kenesPrices.filter(
        (p) => p.name.includes("zoom") && p.active == 1
      );
      const priceFront = kenesPrices.filter(
        (p) => !p.name.includes("zoom") && p.active == 1
      );
      if (sug == ZOOM) {
        return priceZoom[0].url;
      } else {
        return priceFront[0].url;
      }
      return Constants.prodPath;
    });
  },
  buildReplacingObjectMail: function buildReplacingObjectMail(
    userValues,
    paymentLink,
    userSadnas
  ) {
    let veganHebrew = "לא";
    if (userValues.vegan == "0") {
      veganHebrew = "פרונטלי";
    } else {
      veganHebrew = "זום";
    }

    const toReplace = {
      _kenesdate_: Constants.kenesDate,
      _firstname_: userValues.Fname,
      _lastname_: userValues.Lname,
      _email_: userValues.email,
      _tel_: userValues.phone,
      _city_: userValues.city,
      _vegen_: userValues.vegan == "0" ? "זום" : "פרונטלי",
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
