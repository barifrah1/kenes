const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const constants = require("./constants");
const app = express();
const port = 7000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const winston = require("winston");
const expressWinston = require("express-winston");
const { logger } = require("./logger");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*controllers*/
var participantController = require("./controllers/participantController");
var sadnaController = require("./controllers/sadnaController");
var giftController = require("./controllers/giftController");
var paymentController = require("./controllers/paymentController");
var mailController = require("./controllers/mailController");

app.use("/api/participant", participantController);
app.use("/api/gifts", giftController);
app.use("/api/sadnaot", sadnaController);
app.use("/api/payment", paymentController);
app.use("/api/mail", mailController);
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/error.log" }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.get("/api/hello", (req, res) => {
  //res.send({ express: "Hello From Express", bla: constants.BASENAME });
  res.send({ express: constants.BASENAME, port: port });
});

// if (
//   app.get("env") === "development" &&
//   app.get("host") === "localhost" &&
//   app.get("port") === port
// ) {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// }

/* final catch-all route to index.html defined last */

app.use(express.static("../public_html/klafim/public"));

// Then change the route handlers to:
app.get("/participants", (req, res) => {
  logger.info("got in index");
  res.sendFile("index.html", { root: __dirname + "/build" });
});

app.get("/", (req, res) => {
  logger.info("got in p");
  res.sendFile("index.html", { root: __dirname + "/build" });
});
