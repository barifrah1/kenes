const all_queries = {
  participantsTable: `select id,level as category ,Fname,Lname,mail as email,
tel as phone,reg_date,payment,sug,nlplevel,city,photo as photos,vegan,way,inv,sum,cardcom_inv,cardcom_payment from UserKenes order by id desc;`,

  userKenesNextId: `select max(id)+1 as id  from UserKenes;`,
  userSadnaot: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
  sadnaotByRang: `select distinct S.id,S.rang,S.descr from Sadna S  order by S.rang;`,
  InsertNewUser: `INSERT INTO UserKenes VALUES(?,"משתתף",?,?,?,?,?,CURDATE(),0,?,2,?,?,?,0,0,0,0,?);`,
  InsertUserSadnaot: `INSERT INTO UserKenes_sadna VALUES ? ;`,
  InsertTakanonConfirm: `INSERT INTO takanon VALUES (?,?) ;`,
  UpdateUser: `Update UserKenes set level=?,Fname=?,Lname=?,mail=?,payment=?,photo=?,vegan=?,way=?,inv=?,sum=?,nlplevel=? where tel=?;`,
  UpdatetUserSadnaot: `Update UserKenes_sadna U join Sadna S on S.id=U.sadna_id set U.sadna_id=? where U.tel=? and S.rang=? ;`,
  UpdatePayment: `update UserKenes set payment=? where tel=?;`,
  checkPermissions: `select * from Permissions where mail=?`,
  getPaymentOptions: `select * from Payment;`,
};

exports.all_queries = all_queries;

//select max(id)+1 from UserKenes
