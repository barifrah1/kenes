var express = require("express");
var router = express.Router();
var { jwtCheck } = require("../utils");
const { Gift } = require("../functions/gift");

router.get("/", Gift.getGifts);

module.exports = router;
