const { execQuery, execQueryNew } = require("../dbHandler/dbhandler");

const Participant = {
  getParticipants: async (req, res) => {
    const result = await execQueryNew(queries.participants, [], req);
    res.send(JSON.stringify(result));
  },
  getSadnaotByTel: (req, res) => {
    const params = [req.params.tel];
    execQuery(queries.getSadnaotByTel, params, req, res, true);
  },
};

const queries = {
  participants: `select id,level as category ,Fname,Lname,mail as email,
    tel as phone,reg_date,payment,sug,nlplevel,city,photo as photos,vegan,way,inv,sum,cardcom_inv,cardcom_payment from UserKenes order by id desc;`,
  SadnaotByTel: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
};

exports.Participant = Participant;
