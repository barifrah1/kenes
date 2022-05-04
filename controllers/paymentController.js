var express = require('express');
var router = express.Router();
var {jwtCheck} = require('../utils');
const { Payment } = require("../functions/payment");


  //*****payment routes*****/
  router.get("/", Payment.getPaymentOptions);


module.exports = router;
