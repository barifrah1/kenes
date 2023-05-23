const {
  execQueryNew,
  transaction,
} = require("../services/dbHandler/dbHandler");
const { logger } = require("../logger");
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
  getSadnaotById: async (req, res) => {
    const params = [req.params.id];
    const result = await execQueryNew(queries.sadnaotById, params).catch(
      (e) => {
        res.status(400).json({ error: e.message });
        res.send();
      }
    );
    res.send(JSON.stringify(result));
  },
  getGiftById: async (req, res) => {
    const params = [req.params.id];
    const result = await execQueryNew(queries.giftById, params).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });
    res.send(JSON.stringify(result));
  },

  postParticipant: async (req, res) => {
    logger.info(
      `new participant creation request with this info: ${JSON.stringify(
        req.body
      )}`
    );
    try {
      const idRes = await ParticipantHelpers.getParticipantMaxId();
      let id = idRes[0].id;
      if (!id) {
        id = 1;
      }
      const transactionQueries = [
        queries.newUser,
        queries.newUserSadnaot,
        queries.newUserGift,
        queries.newUserTakanonConfirm,
      ];
      const allUserValues = req.body.allValues;
      const user = req.body.user;
      const paymentLink = req.body.paymentLink;
      user[0] = id;
      const ID_INDEX = 1;
      const TAKANON_AGREEMENT_INDEX = 1;
      req.body.sadnaot[0].map((arr) => (arr[ID_INDEX] = id)); //1 is
      const takanonWithId = [id, req.body.takanon[TAKANON_AGREEMENT_INDEX]];
      const giftWithId = [req.body.gift[0], id];
      const params = [user, req.body.sadnaot, giftWithId, takanonWithId];
      const userMail = req.body.email;
      await transaction(transactionQueries, params, logger);
      /*return data about sadnaot to registeration mail*/
      const result = await execQueryNew(queries.sadnaotById, [id], req);
      const sadnaotJson = await JSON.stringify(result);
      const gift = await execQueryNew(queries.giftById, [id], req);
      const giftJson = await JSON.stringify(gift);
      const mailParams = {
        userValues: allUserValues,
        paymentLink: paymentLink,
        userSadnas: sadnaotJson,
        giftJson: giftJson,
      };
      const isSent = await mail.sendMail(mailParams).catch((error) => {
        res.status(200);
        res.send("Registeration Completed but mail is not valid");
      });
      res.send(isSent);
    } catch (e) {
      logger.error(`creation failed with this error ${e.message}`);
      res.status(400);
      res.send(false);
    }
  },

  putParticipant: async (req, res) => {
    logger.info(` putParticipant with body ${JSON.stringify(req.body)}`);
    const transactionQueries = [queries.updateUser, queries.updatetUserGift];
    let params = [req.body.user, req.body.gift];
    for (let i = 0; i < req.body.sadnaot[0].length; i++) {
      transactionQueries.push(queries.updatetUserSadnaot);
      params.push(req.body.sadnaot[0][i]);
    }
    const result = await transaction(transactionQueries, params, logger).catch(
      (e) => {
        logger.error(`error while trying to update user: ${e}`);
        res.status(400).json({ error: e.message });
        res.send();
      }
    );
    res.status(200).json(result);
  },

  registerParticipant: async (req, res) => {
    logger.info(`  Register participant for id ${req.params.id} completed`);
    const transactionQueries = [queries.RegisterUser];
    let params = [[req.params.id,true]];
    const result = await transaction(transactionQueries, params, logger).catch(
      (e) => {
        logger.error(`error while trying to update user: ${e}`);
        res.status(400).json({ error: e.message });
        res.send();
      }
    );
  },

  registerCount: async(req,res) => {
    console.info("Retrive registered count");
    const params = [true];
    const result = await execQueryNew(queries.registerCount, params).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });
    res.send(JSON.stringify(result));
  },

  deleteParticipant: async (req, res) => {
    logger.info(` deleteParticipant with body ${JSON.stringify(req.body)}`);
    const transactionQueries = [queries.deleteUser];
    let params = [req.params.id];
    const result = await transaction(transactionQueries, params, logger).catch(
      (e) => {
        res.status(e.status).json({ error: e.message });
        res.send();
      }
    );
    logger.info(` deleteParticipant for id ${req.params.id} completed`);
    res.status(200).json(result);
  },

  putPaymentByTel: async (req, res) => {
    const result = await transaction(
      [queries.updatePayment],
      [[req.body.payment, req.params.idk]]
    ).catch((e) => {
      res.status(400).json({ error: e.message });
      res.send();
    });
    res.status(200).json("payment was updated succeussfully");
  },
  updateParticipantByCardcom: async (req, res) => {
    logger.info(`carcom update for user: ${JSON.stringify(req.body)}`);
    const releventProducts = ["58"];
    const body = req.body;
    const { invNumber, suminfull, UserEmail, ProductID, ReturnData } = req.body;

    if (releventProducts.includes(ProductID)) {
      const result = await transaction(
        [queries.updateCardcom],
        [[invNumber, invNumber, suminfull, ReturnData]],
        logger
      ).catch((e) => {
        log.error(`error when updating cardcom payment ${e.message}`);
        res.status(400).json({ error: e.message });
        res.send();
      });
      logger.info(
        `cardcom update for user ${UserEmail} completed succeussfully`
      );
      res.status(200).json("cardcom deatials were updated succeussfully");
    } else {
      res.status(200).json("cant find the user with this emails");
    }
  },
};

const ParticipantHelpers = {
  getParticipantMaxId: async () => {
    const result = await execQueryNew(queries.participantNextId, []);
    return result;
  },
};

const queries = {
  // participants: `select id,level as category ,Fname,Lname,mail as email,
  //   tel as phone,reg_date,payment,sug,nlplevel,city,photo as photos,vegan,way,inv,sum,cardcom_inv,cardcom_payment from UserKenes order by id desc;`,
  participants: `select id,level as category ,Fname,Lname,mail as email,
  tel as phone,reg_date,payment,sug,city,photo as photos,vegan,way,inv,sum,cardcom_inv,cardcom_payment from UserKenes order by id asc;`,
  sadnaotById: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.user_id=? order by rang;`,
  giftById: `select distinct S.id, S.descr from UserKenes_gift U join Gift S on U.gift_id=S.id  where U.user_id=? order by S.id;`,
  phones: `select tel from UserKenes;`,
  // newUser: `INSERT INTO UserKenes VALUES(?,"משתתף",?,?,?,?,?,CURDATE(),0,?,2,?,?,?,0,0,0,0,?);`,
  newUser: `INSERT INTO UserKenes VALUES(?,"משתתף",?,?,?,?,?,CURDATE(),0,?,2,?,?,?,0,0,0,0,"");`,
  newUserSadnaot: `INSERT INTO UserKenes_sadna VALUES ? ;`,
  newUserGift: `INSERT INTO UserKenes_gift VALUES (?,?) ;`,
  newUserTakanonConfirm: `INSERT INTO takanon VALUES (?,?) ;`,
  // updateUser: `Update UserKenes set level=?,Fname=?,Lname=?,mail=?,payment=?,photo=?,vegan=?,way=?,inv=?,sum=?,nlplevel=? where id=?;`,
  updateUser: `Update UserKenes set level=?,Fname=?,Lname=?,mail=?,payment=?,photo=?,vegan=?,way=?,inv=?,sum=? where id=?;`,
  updatetUserSadnaot: `Update UserKenes_sadna U join Sadna S on S.id=U.sadna_id set U.sadna_id=? where U.user_id=? and S.rang=? ;`,
  updatetUserGift: `Update UserKenes_gift U join Gift S on S.id=U.gift_id set U.gift_id=? where U.user_id=?;`,
  participantNextId: `select max(id)+1 as id  from UserKenes;`,
  updatePayment: `update UserKenes set payment=? where id=?;`,
  updateCardcom: `update UserKenes set payment=1, cardcom_payment=1, inv=?, cardcom_inv=?,sum=? where code=?;`,
  deleteUser: `delete from UserKenes where id=?;`,
  RegisterUser: `INSERT INTO registerParti VALUES (?,?) ;`,
  registerCount: `COUNT(*)`,
};

exports.Participant = Participant;
