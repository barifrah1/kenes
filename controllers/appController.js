var express = require("express");
var router = express.Router();
var { jwtCheck } = require("../utils");

router.get("/participants", (req, res) => {
  logger.info("got in index");
  res.sendFile(__dirname + "/index.html");
});

router.get("/", (req, res) => {
  logger.info("got in p");
  res.sendFile(__dirname + "/index.html");
});

module.exports = router;
