const { all_queries } = require("./queries/queries");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
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
  return mypromise;
};

exports.insertUserAndSadnaot = insertUserAndSadnaot;
