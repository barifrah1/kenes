const { Mail } = require("../functions/Mail");

function MailRoutes(app) {
  //*****mail routes*****/
  app.post("/api/mail", Mail.sendMail);
}

exports.MailRoutes = MailRoutes;
