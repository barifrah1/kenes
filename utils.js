const { all_queries } = require("./queries/queries");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cs = require("./connectionString");
const app = express();
const port = process.env.PORT || 7000;
const {
  execQuery,
  transaction,
  createConnection,
} = require("./dbHandler/dbhandler");

const insertUserAndSadnaot = async (req, res) => {
  const queries = [
    all_queries.InsertNewUser,
    all_queries.InsertUserSadnaot,
    all_queries.InsertTakanonConfirm,
  ];

  createConnection()
    .then((connection) =>
      connection.query(all_queries.userKenesNextId, (err, rows) => {
        let r = JSON.parse(rows);
        let id = r[0].id;
        let params = [
          [id].concat(req.body.user),
          req.body.sadnaot,
          req.body.takanon,
        ];
        return params;
      })
    )
    .then((params) => transaction(queries, params))
    .then((result) => {
      res.send(result);
    });
  /*.then((rows) => JSON.parse(rows))
    .then((rows) => rows[0].id)
    .then((id) => {
      const params = [
        [id].concat(req.body.user),
        req.body.sadnaot,
        req.body.takanon,
      ];
      return params;
    })
    .then((params) => transaction(queries, params));
*/
  return mypromise;
  /*const id = rows[0].id;

  const params = [
    [id].concat(areq.body.user),
    req.body.sadnaot,
    req.body.takanon,
  ];
  transaction(queries, params);*/
};

exports.insertUserAndSadnaot = insertUserAndSadnaot;
