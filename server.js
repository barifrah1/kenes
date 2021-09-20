const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const Constants = require("./Constants");
const app = express();
const port = process.env.PORT || 7000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { ParticipantRoutes } = require("./routes/ParticipantRoutes");
const { SadnaRoutes } = require("./routes/SadnaRoutes");
const { PaymentRoutes } = require("./routes/PaymentRoutes");
const { PermissionRoutes } = require("./routes/PermissionRoutes");
const { MailRoutes } = require("./routes/MailRoutes");

app.get("/api/hello", (req, res) => {
  //res.send({ express: "Hello From Express", bla: Constants.BASENAME });
  res.send({ express: Constants.BASENAME, port: port });
});
/*routes*/
ParticipantRoutes(app);
SadnaRoutes(app);
PaymentRoutes(app);
PermissionRoutes(app);
MailRoutes(app);

/* final catch-all route to index.html defined last */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
