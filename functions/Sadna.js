const { execQuery } = require("../dbHandler/dbhandler");

const Sadna = {
  getSadnaot: (req, res) => execQuery(queries.sadnaot, [], req, res, true),
};

const queries = {
  sadnaot: `select distinct S.id,S.rang,S.descr from Sadna S  order by S.rang;`,
};

exports.Sadna = Sadna;
