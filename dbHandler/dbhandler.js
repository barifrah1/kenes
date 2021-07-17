const mysql = require("mysql");
const mysql2 = require("mysql2/promise");
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
async function execQuery(q, params, req, res, send_res) {
  const connection = await createConnection();
  if (params.length == 0) {
    connection.query(q, (err, rows) => {
      if (err) throw err;
      if (send_res == true) {
        res.send(rows);
        return true;
      } else {
        return JSON.stringify(rows);
      }
    });
  } else {
    connection.query(q, params, (err, rows) => {
      if (err) throw err;
      if (send_res == true) {
        console.log(connection.format(q, params));
        res.send(rows);
        return true;
      } else {
        return JSON.stringify(rows);
      }
    });
  }
  connection.end();
}

function execQuerySync(q, params, req, res, send_res) {
  const connection = createConnection();
  if (params.length == 0) {
    connection.query(q, (err, rows) => {
      if (err) throw err;
      if (send_res == true) {
        res.send(JSON.stringify(rows));
        return true;
      } else {
        return JSON.stringify(rows);
      }
    });
  } else {
    connection.query(q, params, (err, rows) => {
      if (err) throw err;
      if (send_res == true) {
        console.log(connection.format(q, params));
        res.send(rows);
        return true;
      } else {
        return JSON.stringify(rows);
      }
    });
  }
  connection.end();
}

async function transaction(queries, queryValues) {
  if (queries.length !== queryValues.length) {
    return Promise.reject(
      "Number of provided queries did not match the number of provided query values arrays"
    );
  }
  const connection = await mysql2.createConnection({
    host: cs.host,
    user: cs.user,
    password: cs.password,
    database: cs.database,
  });
  console.log(queryValues);
  try {
    await connection.beginTransaction();
    const queryPromises = [];
    queries.forEach((query, index) => {
      console.log(connection.format(query, queryValues[index]));
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
exports.createConnection = createConnection;
exports.execQuery = execQuery;
exports.execQuerySync = execQuerySync;
exports.transaction = transaction;
