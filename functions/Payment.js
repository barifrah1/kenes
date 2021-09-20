const { execQueryNew } = require("../services/dbHandler/dbHandler");

const Payment = {
  getPaymentOptions: async (req, res) => {
    const result = await execQueryNew(queries.getPaymentOptions, []).catch(
      (e) => {
        res.status(400).json({ error: e.message });
        res.send();
      }
    );
    res.send(JSON.stringify(result));
  },
};

const queries = {
  getPaymentOptions: `select * from Payment;`,
};

exports.Payment = Payment;
