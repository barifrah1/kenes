const all_queries = {
  participantsTable: `select id,level as category ,Fname,Lname,mail,
tel as phone,reg_date,payment,sug,nlplevel,city,photo,vegan,way,inv from UserKenes;`,

  userSadnaot: `select distinct S.id,S.rang,S.descr from UserKenes_sadna U join Sadna S on U.sadna_id=S.id  where U.tel=? order by rang; ;`,
  sadnaotByRang: `select distinct S.id,S.rang,S.descr from Sadna S  order by S.rang;`,
  InsertNewUser: `INSERT INTO UserKenes VALUES(select max(id)+1 from UserKene,?,?,?,?,?,?,CURDATE(),0,?,2,?,?,?,-1,0);`,
  InsertUserSadnaot: `INSERT INTO UserKenes_sadna VALUES(?,?);`,
};

exports.all_queries = all_queries;
