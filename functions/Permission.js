const { execQuery } = require("../dbHandler/dbhandler");

const Permission = {
  checkPermission: (req, res) => {
    const params = [req.body.userMail];
    const result = execQuery(
      all_queries.checkPermissions,
      params,
      req,
      res,
      true
    );
  },
};

exports.Permission = Permission;
//exports.checkPermissions = checkPermissions;
