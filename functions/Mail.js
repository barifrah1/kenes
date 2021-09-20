const Constants = require("../Constants");
const mailSender = require("../services/mailHandler/mailHandler");
const Mail = {
  sendMail: async (req, res) => {
    const toReplace = req.body.toReplace;
    //const toReplace = toReplaceDebug;// FOR DEBUG PURPUSES
    const userMail = req.body.toReplace._email_;

    const result = await mailSender
      .customMailSender(
        Constants.REGISTERATION_MAIL_SUBJECT,
        userMail,
        Constants.TEMPLATE_PATH,
        toReplace
      )
      .catch((error) => {
        console.error();
        res.send(error);
      });
    res.send(result);
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

exports.Mail = Mail;
