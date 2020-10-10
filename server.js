const { all_queries } = require("./queries/queries");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cs = require("./connectionString");
const app = express();
const port = process.env.PORT || 5000;
const { execQuery, transaction } = require("./dbHandler/dbhandler");
const { insertUserAndSadnaot } = require("./utils");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

/*returns  UserData for participants table*/
app.post("/api/getdata", (req, res) =>
  execQuery(all_queries.participantsTable, [], req, res, true)
);

/*returns  UserSadnaot for specific user participants table - expanded part */
app.post("/api/get_user_sadnaot", (req, res) => {
  const params = [req.phone];
  execQuery(all_queries.userSadnaot, params, req, res, true);
});

/*returns all sadnaot details by rang for sadnaotForm component */
app.post("/api/getSadnaot", (req, res) =>
  execQuery(all_queries.sadnaotByRang, [], req, res, true)
);

/*Insert NewUser and his Sadnaot*/
app.post("/api/InsertUserAndSadnaot", (req, res) => {
  const queries = [
    all_queries.InsertNewUser,
    all_queries.InsertUserSadnaot,
    all_queries.InsertTakanonConfirm,
  ];
  const params = [req.body.user, req.body.sadnaot, req.body.takanon];
  transaction(queries, params);

  //let result = insertUserAndSadnaot(req, res);
  res.send("user added succeussfully");
});

/*get max id of UserKenes table*/
app.post("/api/getMaxId", (req, res) =>
  execQuery(all_queries.userKenesNextId, [], req, res, true)
);

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});*/
