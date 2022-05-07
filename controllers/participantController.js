var express = require('express');
var router = express.Router();
var {jwtCheck} = require('../utils');
const { Participant } = require("../functions/participant");


  /*returns  UserData for participants table*/

  /*for debugging purposes */
  // router.use((req, res, next) => {
  //   console.log(req.url);
  //   next();
  // });
  router.get("/", jwtCheck, Participant.getParticipants);

  //Participant.getParticipants
  /*returns  UserSadnaot for specific user in participants table - expanded part */
  router.get(
    "/:id/sadnaot/",
    jwtCheck,
    Participant.getSadnaotById
  );

  /*get all phones*/
  router.get(
    "/phone",
    jwtCheck,
    Participant.getParticipantsPhones
  );

  /*checkPhoneInUse*/
  router.get("/:phone", Participant.checkPhoneInUse);

  /*Insert NewUser and his Sadnaot*/
  router.post("/", Participant.postParticipant);

  /*Update User details and his Sadnaot*/
  router.put("/", jwtCheck, Participant.putParticipant);

  router.put(
    "/:id/payment",
    jwtCheck,
    Participant.putPaymentByTel
  );

module.exports = router