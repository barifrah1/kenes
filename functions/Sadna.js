const { execQueryNew } = require("../services/dbHandler/dbHandler");

const Sadna = {
  getSadnaot: async (req, res) => {
    const { available } = req.query;
    try {
      if (available) {
        const result = await execQueryNew(queries.sadnaotAvailable, []);
        const json = await JSON.stringify(result);
        res.send(json);
      } else {
        const result = await execQueryNew(queries.sadnaot, []);
        const json = await JSON.stringify(result);
        res.send(json);
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
      res.send();
    }
  },
};

const queries = {
  sadnaot: `select distinct S.id,S.rang,S.descr from Sadna S  order by S.rang;`,
  sadnaotAvailable: `select distinct S.id,S.rang,S.descr from Sadna S join UserKenes_sadna U on S.id=U.sadna_id group by S.id,S.rang,S.descr,S.amount having S.amount>count(U.tel)  
  ORDER BY S.rang ASC, COUNT(tel) ASC;`,
};

exports.Sadna = Sadna;
