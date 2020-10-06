const mysql = require("mysql");
const cs = require("../connectionString");
const { all_queries } = require("../queries/queries");

function createConnection() {
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
  return connection;
}

function execQuery(q, req, res) {
  const connection = createConnection();
  connection.query(q, "102", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
  connection.end();
}

exports.execQuery = execQuery;
