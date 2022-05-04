const {
  execQueryNew,
  transaction,
} = require("../services/dbHandler/dbHandler");
const { mail } = require("./mail");
const Participant = {
  getParticipants: async (req, res) => {
    const result = await execQueryNew(queries.participants, []).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });
    res.send(JSON.stringify(result));
  },
  getParticipantsPhones: async (req, res) => {
    const result = await execQueryNew(queries.phones, [], req).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });

    res.send(JSON.stringify(result));
  },
  checkPhoneInUse: async (req, res) => {
    const result = await execQueryNew(queries.phones, [], req).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });
    const { phone } = req.params;
    const filtered = result.filter((row) => row.tel == phone);

    if (filtered.length) res.send(JSON.stringify(true));
    else res.send(JSON.stringify(false));
  },
  getSadnaotByTel: async (req, res) => {
    const params = [req.params.tel];
    const result = await execQueryNew(queries.sadnaotByTel, params).catch(
      (e) => {
        res.status(400).json({ error: e.message });
        res.send();
      }
    );
    res.send(JSON.stringify(result));
  },

  postParticipant: async (req, res) => {
    try{
    const idRes = await ParticipantHelpers.getParticipantMaxId();
    const id = idRes[0].id;
    const transactionQueries = [
      queries.newUser,
      queries.newUserSadnaot,
      queries.newUserTakanonConfirm,
    ];
    const allUserValues = req.body.allValues;
    const user = req.body.user;
    const paymentLink = req.body.paymentLink;
    user[0] = id;
    console.log("check", id);
    const params = [user, req.body.sadnaot, req.body.takanon];
    const userMail = req.body.email;
    const userPhone = req.body.takanon[0];
    await transaction(transactionQueries, params).catch((error) => {
      throw error;
    });
    /*return data about sadnaot to registeration mail*/
    const result = await execQueryNew(queries.userSadnaot, [userPhone], req);
    const sadnaotJson = await JSON.stringify(result);
    const mailParams = {
      userValues: allUserValues,
      paymentLink: paymentLink,
      userSadnas: sadnaotJson,
    };
    const isSent = await mail.sendMail(mailParams).catch((error)=>{
      res.status(200)
      res.send("Registeration Completed but mail is not valid");
    });
    res.send(isSent);
  }
  catch(e){
    res.status(400);
    res.send(false);
  }
  },

  putParticipant: async (req, res) => {
    const transactionQueries = [queries.updateUser];
    let params = [req.body.user];
    for (let i = 0; i < req.body.sadnaot[0].length; i++) {
      transactionQueries.push(queries.updatetUserSadnaot);
      params.push(req.body.sadnaot[0][i]);
    }
    const result = await transaction(transactionQueries, params).catch((e) => {
      res.status(400);
      res.send({ error: "transaction failed" });
    });
    res.send(JSON.stringify(result));
  },
  putPaymentByTel: async (req, res) => {
    const result = await transaction(
      [queries.updatePayment],
      [[req.body.payment, req.params.tel]]
    ).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });
    res.send(JSON.stringify("payment was updated succeussfully"));
  },
};

const ParticipantHelpers = {
  getParticipantMaxId: async () => {
    const result = await execQueryNew(queries.participantNextId, []);
    return result;
  },
};

const queries = {
  participants: `select id,level as category ,Fname,Lname,mail as email,
    tel as phone,reg_date,payment,sug,nlplevel,city,photo as photos,vegan,way,inv,sum,cardcom_inv,cardcom_payment from UserKenes order by id desc;`,
  sadnaotByTel: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
  phones: `select tel from UserKenes;`,
  newUser: `INSERT INTO UserKenes VALUES(?,"משתתף",?,?,?,?,?,CURDATE(),0,?,2,?,?,?,0,0,0,0,?);`,
  newUserSadnaot: `INSERT INTO UserKenes_sadna VALUES ? ;`,
  newUserTakanonConfirm: `INSERT INTO takanon VALUES (?,?) ;`,
  userSadnaot: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
  updateUser: `Update UserKenes set level=?,Fname=?,Lname=?,mail=?,payment=?,photo=?,vegan=?,way=?,inv=?,sum=?,nlplevel=? where tel=?;`,
  updatetUserSadnaot: `Update UserKenes_sadna U join Sadna S on S.id=U.sadna_id set U.sadna_id=? where U.tel=? and S.rang=? ;`,
  participantNextId: `select max(id)+1 as id  from UserKenes;`,
  updatePayment: `update UserKenes set payment=? where tel=?;`,
};

exports.Participant = Participant;
