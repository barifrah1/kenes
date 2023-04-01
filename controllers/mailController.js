var express = require("express");
var router = express.Router();
var { jwtCheck } = require("../utils");
const { mail } = require("../functions/mail");

//*****mail routes*****/
router.post("/api/mail", mail.sendMail);

module.exports = router;
