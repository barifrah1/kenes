const mysql = require("mysql2/promise");
const cs = require("../connectionString");
const { all_queries } = require("../queries/queries");

async function createConnection() {
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

async function transaction(queries, queryValues) {
  if (queries.length !== queryValues.length) {
    return Promise.reject(
      "Number of provided queries did not match the number of provided query values arrays"
    );
  }
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const queryPromises = [];

    queries.forEach((query, index) => {
      queryPromises.push(connection.query(query, queryValues[index]));
    });
    const results = await Promise.all(queryPromises);
    await connection.commit();
    await connection.end();
    return results;
  } catch (err) {
    await connection.rollback();
    await connection.end();
    return Promise.reject(err);
  }
}

exports.execQuery = execQuery;
exports.transaction = transaction;
