const nodemailer = require("nodemailer");
const config = require("./mailConfiguration/mailConfiguration");
const fs = require("fs");
const path = require("path");
const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  FROM_MAIL,

  HELP_MAIL,
} = require("../../constants");
const Constants = require("../../constants");

async function customMailSender(subject, sendTo, templatePath, replaceObject) {
  if (Constants.SEND_MAILS == true) {
    try {
      let mailHtml = fs.readFileSync(
        path.resolve(__dirname, templatePath),
        "utf8"
      );
      let replacedHtml = templeteFiller(mailHtml, replaceObject);
      let transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: MAIL_USER, // generated ethereal user
          pass: config.mailPassword, // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: FROM_MAIL, // sender address
        to: sendTo, // list of receivers
        subject: subject, // Subject line
        html: replacedHtml, // html body
        attachments: [
          {
            filename: "facebook2x.png",
            path: `./services/mailHandler/emailTemplates/images/facebook2x.png`,
            cid: "emailTemplates/images/facebook2x.png", //same cid value as in the html img src
          },
          {
            filename: "instagram2x.png",
            path: `./services/mailHandler/emailTemplates/images/instagram2x.png`,
            cid: "emailTemplates/images/instagram2x.png", //same cid value as in the html img src
          },
          {
            filename: "nlpcreativeschool.png",
            path: `./services/mailHandler/emailTemplates/images/nlpcreativeschool.png`,
            cid: "emailTemplates/images/nlpcreativeschool.png", //same cid value as in the html img src
          },
          {
            filename: "kenes21.png",
            path: `./services/mailHandler/emailTemplates/images/kenes21.jpg`,
            cid: "emailTemplates/images/kenes21.png", //same cid value as in the html img src
          },
          {
            filename: "bee.png",
            path: `./services/mailHandler/emailTemplates/images/bee.png`,
            cid: "emailTemplates/images/bee.png", //same cid value as in the html img src
          },
        ],
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return info;
    } catch (error) {
      console.error();
    }
  } else {
    return true;
  }
}

function templeteFiller(mailHtml, replaceObject) {
  //let html = Object.assign("", mailHtml);
  var html = mailHtml;
  Object.keys(replaceObject).map((key) => {
    html = html.replace(key, replaceObject[key]);
  });

  return html;
}

const toReplace = {
  _kenesdate_: "20/10/2021",
  _firstname_: "בר",
  _lastname_: "יפרח",
  _email_: "barifrah2@gmail.com",
  _tel_: "0525774334",
  _city_: "תל אביב-יפו",
  _vegen_: "לא",
  _helpmail_: "nlpmiri@gmail.com",
  _mirimail_: "nlpmiri@gmail.com",
  _paymentlink_: "www.google.co.il",
  _sad1_: "חרטא ברטה בפיתה עם ירון הלוי המלך",
  _sad2_: "בדיקה בדיקה עם עדי המלכה",
  _sad3_: "הסוני פלייסטין קורס מתקדמים",
  _gift_: "אין",
};

/*customMailSender(
  "הרשמתך לכנס קלפים ביצירה ישראלית נקלטה",
  "barifrah1@gmail.com",
  TEMPLATE_PATH,
  toReplace
).catch(console.error);*/

exports.customMailSender = customMailSender;
