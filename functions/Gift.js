const { execQueryNew } = require("../services/dbHandler/dbHandler");

const Gift = {
  getGifts: async (req, res) => {
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
  sadnaot: `select distinct S.id,S.descr from Gift S  order by S.id;`,
  sadnaotAvailable: `select distinct S.id ,S.descr from Gift S left join UserKenes_gift U on S.id=U.gift_id group by S.id,S.descr,S.amount having S.amount>count(U.user_id)  
  ORDER BY S.id ASC;`,
};

exports.Gift = Gift;
