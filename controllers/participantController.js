var express = require("express");
var router = express.Router();
var { jwtCheck } = require("../utils");
const { Participant } = require("../functions/participant");

/*returns  UserData for participants table*/

/*for debugging purposes */
// router.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

//Debug msg from client
/*router.use((req, res, next) => {
    console.log('Received request:');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
  });
*/

router.get("/", jwtCheck, Participant.getParticipants);
/*get arrival participants*/
router.get("/register",jwtCheck,Participant.getArrParticipants);
/*get arrival participants count*/
router.get("/registerC",jwtCheck,Participant.registerCount);
// check registration status for specific participant
router.get("/registerS", jwtCheck, Participant.getRegisterStatus);

//Participant.getParticipants
/*returns  UserSadnaot for specific user in participants table - expanded part */
router.get("/:id/sadnaot/", jwtCheck, Participant.getSadnaotById);

router.get("/:id/gift/", jwtCheck, Participant.getGiftById);

/*get all phones*/
router.get("/phone", jwtCheck, Participant.getParticipantsPhones);

/*checkPhoneInUse*/
router.get("/:phone", Participant.checkPhoneInUse);

/*Insert NewUser and his Sadnaot*/
router.post("/", Participant.postParticipant);

/*Update User details and his Sadnaot*/
router.put("/", jwtCheck, Participant.putParticipant);

/*Update User details and his Sadnaot*/
router.delete("/:id", jwtCheck, Participant.deleteParticipant);

/*update user checkin status in kenes day*/
router.post("/registerP",Participant.registerParticipant);


/*checkPhoneInUse*/
router.get("/:id", Participant.checkPhoneInUse);

router.put("/:id/payment", jwtCheck, Participant.putPaymentByTel);

router.post("/cardcom", Participant.updateParticipantByCardcom);



module.exports = router;
