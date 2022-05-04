const { execQueryNew } = require("../services/dbHandler/dbHandler");

const Payment = {
  getPaymentOptions: async (req, res) => {
    const { active } = req.query;

    const result = await execQueryNew(queries.getPaymentOptions, []).catch(
      (e) => {
        res.status(400).json({ error: e.message });
        res.send();
      }
    );
    if (active) {
      const filtered = result.filter((row) => row.active == 1);
      res.send(JSON.stringify(filtered));
    }
    res.send(JSON.stringify(result));
  },
};

const queries = {
  getPaymentOptions: `select * from Payment;`,
};

exports.Payment = Payment;
