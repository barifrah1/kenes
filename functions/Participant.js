const {
  execQuery,
  execQueryNew,
  transaction,
} = require("../dbHandler/dbhandler");

const Participant = {
  getParticipants: async (req, res) => {
    const result = await execQueryNew(queries.participants, [], req);
    console.log("xx", result);
    res.send(JSON.stringify(result));
  },
  getSadnaotByTel: async (req, res) => {
    const params = [req.params.tel];
    const result = await execQueryNew(queries.sadnaotByTel, params);
    res.send(JSON.stringify(result));
  },

  postParticipant: async (req, res) => {
    const transactionQueries = [
      queries.newUser,
      queries.newUserSadnaot,
      queries.newUserTakanonConfirm,
    ];
    const params = [req.body.user, req.body.sadnaot, req.body.takanon];
    const userMail = req.body.email;
    const userPhone = req.body.takanon[0];
    await transaction(transactionQueries, params).catch((error) => {
      throw error;
    });
    /*return data about sadnaot to registeration mail*/
    const result = await execQueryNew(queries.userSadnaot, [userPhone], req);
    const sadnaotJson = await JSON.stringify(result);
    res.send(sadnaotJson);
  },

  putParticipant: async (req, res) => {
    const transactionQueries = [queries.updateUser];
    let params = [req.body.user];
    for (let i = 0; i < req.body.sadnaot[0].length; i++) {
      transactionQueries.push(queries.updatetUserSadnaot);
      params.push(req.body.sadnaot[0][i]);
    }
    transactionQueries.push("select * from blafd;");
    params.push([]);
    const result = await transaction(transactionQueries, params);
    res.send("user details were updated succeussfully");
  },
};

const queries = {
  participants: `select id,level as category ,Fname,Lname,mail as email,
    tel as phone,reg_date,payment,sug,nlplevel,city,photo as photos,vegan,way,inv,sum,cardcom_inv,cardcom_payment from UserKenes order by id desc;`,
  sadnaotByTel: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
  newUser: `INSERT INTO UserKenes VALUES(?,"משתתף",?,?,?,?,?,CURDATE(),0,?,2,?,?,?,0,0,0,0,?);`,
  newUserSadnaot: `INSERT INTO UserKenes_sadna VALUES ? ;`,
  newUserTakanonConfirm: `INSERT INTO takanon VALUES (?,?) ;`,
  userSadnaot: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
  updateUser: `Update UserKenes set level=?,Fname=?,Lname=?,mail=?,payment=?,photo=?,vegan=?,way=?,inv=?,sum=?,nlplevel=? where tel=?;`,
  updatetUserSadnaot: `Update UserKenes_sadna U join Sadna S on S.id=U.sadna_id set U.sadna_id=? where U.tel=? and S.rang=? ;`,
};

exports.Participant = Participant;
