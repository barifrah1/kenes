var express = require("express");
var router = express.Router();
var { jwtCheck } = require("../utils");
const { gift } = require("../functions/gift");

router.get("/", gift.getGifts);

module.exports = router;
