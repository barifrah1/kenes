var express = require('express');
var router = express.Router();
var {jwtCheck} = require('../utils');
const { Sadna } = require("../functions/sadna");


  /*returns all sadnaot details by rang for sadnaotForm component */
  router.get("/", Sadna.getSadnaot);


module.exports = router;
