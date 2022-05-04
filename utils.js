const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const constants = require("./constants");
const app = express();
const port = process.env.PORT || 7000;
const {
  execQuery,
  transaction,
  createConnection,
} = require("./services/dbHandler/dbHandler");


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://kenesklafim.us.auth0.com/.well-known/jwks.json",
  }),
  audience: constants.AUDIENCE,
  issuer: constants.JWT_ISSUER,
  algorithms: ["RS256"],
});


exports.jwtCheck = jwtCheck;
