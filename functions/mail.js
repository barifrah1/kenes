const constants = require("../constants");
const { HELP_MAIL, KENES_DATE } = require("../constants");
const mailSender = require("../services/mailHandler/mailHandler");
const MAIL_INDEX = 3;

const mail = {
  sendMail: async (params) => {
    const { userValues, paymentLink, userSadnas } = params;
    const sadnaotJson = JSON.parse(userSadnas);
    const toReplace = MailHelpers.buildReplacingObjectMail(
      userValues,
      paymentLink,
      sadnaotJson
    );

    //const toReplace = req.body.toReplace;
    //const toReplace = toReplaceDebug;// FOR DEBUG PURPUSES
    const userMail = userValues.email; //req.body.toReplace._email_;

    const result = await mailSender
      .customMailSender(
        constants.REGISTERATION_MAIL_SUBJECT,
        userMail,
        constants.TEMPLATE_PATH,
        toReplace
      )
      .catch((error) => {
        console.error();
        //res.send(error);
      });
    //res.send(result);
    return result;
  },
};

const MailHelpers = {
  buildReplacingObjectMail: function buildReplacingObjectMail(
    userValues,
    paymentLink,
    userSadnas
  ) {
    let veganHebrew;
    if (userValues.vegan == "0") {
      veganHebrew = "זום";
    } else {
      veganHebrew = "פרונטלי";
    }

    const toReplace = {
      _kenesdate_: KENES_DATE,
      _firstname_: userValues.Fname,
      _lastname_: userValues.Lname,
      _email_: userValues.email,
      _tel_: userValues.phone,
      _city_: userValues.city,
      _vegen_: userValues.vegan == "0" ? "זום" : "פרונטלי",
      _helpmail_: HELP_MAIL,
      _mirimail_: HELP_MAIL,
      _paymentlink_: paymentLink,
      _sad1_: userSadnas[0].descr,
      _sad2_: userSadnas[1].descr,
      _sad3_: userSadnas[2].descr,
      _gift_: "אין",
    };
    return toReplace;
  },
};

const toReplaceDebug = {
  _kenesdate_: "20/10/2021",
  _firstname_: "בר",
  _lastname_: "יפרח",
  _email_: "barifrah2@gmail.com",
  _tel_: "0525774334",
  _city_: "תל אביב-יפו",
  _vegen_: "לא",
  _mirimail_: "nlpmiri@gmail.com",
  _paymentlink_: "www.google.co.il",
  _sad1_: "חרטא ברטה בפיתה עם ירון הלוי המלך",
  _sad2_: "בדיקה בדיקה עם עדי המלכה",
  _sad3_: "הסוני פלייסטין קורס מתקדמים",
  _gift_: "אין",
};

exports.mail = mail;
