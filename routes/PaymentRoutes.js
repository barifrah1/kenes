const { Payment } = require("../functions/Payment");

function PaymentRoutes(app) {
  //*****payment routes*****/
  app.get("/api/payments", Payment.getPaymentOptions);
}

exports.PaymentRoutes = PaymentRoutes;
