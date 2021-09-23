const { Participant } = require("../functions/Participant");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://kenesklafim.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://klafim.mecreativenlp.com/",
  issuer: "https://kenesklafim.us.auth0.com/",
  algorithms: ["RS256"],
});

function ParticipantRoutes(app) {
  /*returns  UserData for participants table*/
  app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.headers);
    next();
  });
  app.get("/api/participants/", jwtCheck, Participant.getParticipants);

  //Participant.getParticipants
  /*returns  UserSadnaot for specific user in participants table - expanded part */
  app.get("/api/participant/:tel/sadnaot/", Participant.getSadnaotByTel);

  /*get max id from participant table*/
  app.get("/api/participants/ids/max", Participant.getParticipantMaxId);

  /*get all phones*/
  app.get(
    "/api/participants/phone",
    jwtCheck,
    Participant.getParticipantsPhones
  );

  /*get all phones*/
  app.get("/api/participant/:phone", Participant.checkPhoneInUse);

  /*Insert NewUser and his Sadnaot*/
  app.post("/api/participant", Participant.postParticipant);

  /*Update User details and his Sadnaot*/
  app.put("/api/participant", Participant.putParticipant);

  app.put(
    "/api/participant/:tel/payment",
    jwtCheck,
    Participant.putPaymentByTel
  );
}

exports.ParticipantRoutes = ParticipantRoutes;
