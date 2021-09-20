const { Participant } = require("../functions/Participant");

function ParticipantRoutes(app) {
  //****participants routes*****

  /*returns  UserData for participants table*/
  app.get("/api/participants/", Participant.getParticipants);

  /*returns  UserSadnaot for specific user in participants table - expanded part */
  app.get("/api/participant/:tel/sadnaot/", Participant.getSadnaotByTel);

  /*get max id from participant table*/
  app.get("/api/participants/ids/max", Participant.getParticipantMaxId);

  /*get all phones*/
  app.get("/api/participants/phone", Participant.getParticipantsPhones);

  /*Insert NewUser and his Sadnaot*/
  app.post("/api/participant", Participant.postParticipant);

  /*Update User details and his Sadnaot*/
  app.put("/api/participant", Participant.putParticipant);

  app.put("/api/participant/:tel/payment", Participant.putPaymentByTel);
}

exports.ParticipantRoutes = ParticipantRoutes;
