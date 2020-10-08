const { all_queries } = require("./queries/queries");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cs = require("./connectionString");
const app = express();
const port = process.env.PORT || 5000;
const { execQuery } = require("./dbHandler/dbhandler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

/*returns  UserData for participants table*/
app.post("/api/getdata", (req, res) =>
  execQuery(all_queries.participantsTable, req, res)
);

/*returns  UserSadnaot for specific user participants table - expanded part */
app.post("/api/get_user_sadnaot", (req, res) => {
  const params = [req.phone];
  execQuery(all_queries.userSadnaot, req, res);
});

/*returns all sadnaot details by rang for sadnaotForm component */
app.post("/api/getSadnaot", (req, res) =>
  execQuery(all_queries.sadnaotByRang, req, res)
);

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});*/
