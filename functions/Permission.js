const { execQuery } = require("../services/dbHandler/dbHandler");

const Permission = {
  checkPermission: (req, res) => {
    const params = [req.body.userMail];
    const result = execQuery(queries.checkPermissions, params, req, res, true);
  },
};

const queries = {
  checkPermissions: `select * from Permissions where mail=?`,
};

exports.Permission = Permission;
//exports.checkPermissions = checkPermissions;
