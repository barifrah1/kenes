const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const constants = require("./constants");
const app = express();
const port = 7000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const winston = require("winston");
const expressWinston = require("express-winston");
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*controllers*/
var participantController = require("./controllers/participantController");
var sadnaController = require("./controllers/sadnaController");
var paymentController = require("./controllers/paymentController");
var mailController = require("./controllers/mailController");

app.use("/api/participant", participantController);
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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/participants", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
