const e = require("express");
const mysql = require("mysql");
const mysql2 = require("mysql2/promise");
const cs = require("./connectionString");

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

async function createConnectionWithPromise() {
  const connection = await mysql2.createConnection({
    host: cs.host,
    user: cs.user,
    password: cs.password,
    database: cs.database,
  });
  return connection;
}

async function execQueryNew(q, params) {
  let rows;
  let fields;
  const connection = await createConnectionWithPromise();
  try {
    if (params.length == 0) {
      [rows, fields] = await connection.execute(q).catch((e) => {
        throw e;
      });
      return rows;
    } else {
      [rows, fields] = await connection.execute(q, params);
      return rows;
    }
  } catch (error) {
    console.log(error);
    throw error;
    //throw error;
  } finally {
    connection.end();
  }
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
    console.log(results);
    await connection.commit();
    await connection.end();
    return results;
  } catch (err) {
    await connection.rollback();
    await connection.end();
    throw err;
    //return Promise.reject(err);
  }
}
exports.createConnection = createConnection;
exports.execQueryNew = execQueryNew;
exports.transaction = transaction;
