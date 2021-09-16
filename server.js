const { all_queries } = require("./queries/queries");
const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const Constants = require("./Constants");
const mysql = require("mysql");
const mailSender = require("./mailService");
const app = express();
const port = process.env.PORT || 7000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const {
  execQuery,
  execQueryNew,
  transaction,
} = require("./dbHandler/dbhandler");
const { Permission } = require("./functions/Permission");
const { Participant } = require("./functions/Participant");
const { Sadna } = require("./functions/Sadna");
const { insertUserAndSadnaot } = require("./utils");

app.get("/api/hello", (req, res) => {
  //res.send({ express: "Hello From Express", bla: Constants.BASENAME });
  res.send({ express: Constants.BASENAME, port: port });
});

//*****permisison routes*****
app.get("/api/permission/:mail", Permission.checkPermission);

//****participants routes*****

/*returns  UserData for participants table*/
app.get("/api/participants/", async (req, res) =>
  Participant.getParticipants(req, res)
);

/*returns  UserSadnaot for specific user participants table - expanded part */
app.get("/api/participant/:tel/sadnaot/", Participant.getSadnaotByTel);

/*****sadnaot routes*****/

/*returns all sadnaot details by rang for sadnaotForm component */
app.get("/api/sadnaot", Sadna.getSadnaot);

/*Insert NewUser and his Sadnaot*/
app.post("/api/InsertUserAndSadnaot", async (req, res) => {
  const queries = [
    all_queries.InsertNewUser,
    all_queries.InsertUserSadnaot,
    all_queries.InsertTakanonConfirm,
  ];
  const params = [req.body.user, req.body.sadnaot, req.body.takanon];
  const userMail = req.body.email;
  console.log(req.body.takanon[0]);
  await transaction(queries, params).catch((error) => {
    throw error;
  });
  /*return data about sadnaot to registeration mail*/
  const result = await execQueryNew(
    all_queries.userSadnaot,
    [req.body.takanon[0]],
    req
  );
  const sadnaotJson = await JSON.stringify(result);
  res.send(sadnaotJson);
});

/*Update User details and his Sadnaot*/
app.post("/api/UpdateUserAndSadnaot", (req, res) => {
  let queries = [all_queries.UpdateUser];
  let params = [req.body.user];
  for (let i = 0; i < req.body.sadnaot[0].length; i++) {
    queries.push(all_queries.UpdatetUserSadnaot);
    params.push(req.body.sadnaot[0][i]);
  }
  transaction(queries, params);
  res.send("user details were updated succeussfully");
});

app.post("/api/UpdatePayment", (req, res) => {
  console.log(req.body);
  transaction(
    [all_queries.UpdatePayment],
    [[req.body.payment, req.body.phone]]
  );
  res.send("payment was updated succeussfully");
});

/*get max id of UserKenes table*/
app.post("/api/getMaxId", (req, res) =>
  execQuery(all_queries.userKenesNextId, [], req, res, true)
);

app.post("/api/getPaymentOptions", async (req, res) => {
  const result = await execQueryNew(all_queries.getPaymentOptions, [], req);
  res.send(JSON.stringify(result));
});

app.post("/api/getAllPhones", async (req, res) => {
  const result = await execQueryNew(all_queries.getAllPhones, [], req);
  res.send(JSON.stringify(result));
});

app.post("/api/sendMail", async (req, res) => {
  const toReplace = req.body.toReplace;
  const userMail = req.body.toReplace._email_;
  /*const toReplace = {
    _kenesdate_: "20/10/2021",
    _firstname_: "בר",
    _lastname_: "יפרח",
    _email_: "barifrah2@gmail.com",
    _tel_: "0525774334",
    _city_: "תל אביב-יפו",
    _vegen_: "לא",
    _mirimail_: "nlpmiri@gmail.com",
    _paymentlink_: "www.google.co.il",
    _sad1_: "חרטא ברטה בפיתה עם ירון הלוי המלך",
    _sad2_: "בדיקה בדיקה עם עדי המלכה",
    _sad3_: "הסוני פלייסטין קורס מתקדמים",
    _gift_: "אין",
  };*/
  const result = await mailSender
    .customMailSender(
      Constants.REGISTERATION_MAIL_SUBJECT,
      userMail,
      Constants.TEMPLATE_PATH,
      toReplace
    )
    .catch((error) => {
      console.error();
      res.send(error);
    });
  res.send(result);
});

/* final catch-all route to index.html defined last */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
