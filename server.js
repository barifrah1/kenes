const queries = require("./queries.json");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cs = require("./connectionString.json");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getdata", (req, res) => {
  const connection = mysql.createConnection({
    host: cs.host,
    user: cs.user,
    password: cs.password,
    database: cs.database,
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });
  connection.query(queries.participantsTable, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
  connection.end();
});

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
