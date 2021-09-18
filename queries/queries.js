const all_queries = {
  userKenesNextId: `select max(id)+1 as id  from UserKenes;`,
  sadnaotByRang: `select distinct S.id,S.rang,S.descr from Sadna S  order by S.rang;`,

  UpdatePayment: `update UserKenes set payment=? where tel=?;`,
  checkPermissions: `select * from Permissions where mail=?`,
  getPaymentOptions: `select * from Payment;`,
  getAllPhones: `select tel from UserKenes;`,
};

exports.all_queries = all_queries;

//select max(id)+1 from UserKenes
