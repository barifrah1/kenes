const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "138.201.9.153",
  user: "mecreati_bar",
  password: "yfT40XYA.23@ba",
  database: "mecreati_nlp19",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

connection.query("SELECT * FROM reg_open", (err, rows) => {
  if (err) throw err;

  console.log("Data received from Db:");
  console.log(rows);
});
