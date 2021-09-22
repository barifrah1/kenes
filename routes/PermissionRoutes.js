const { Permission } = require("../functions/Permission");

function PermissionRoutes(app) {
  //*****permisison routes*****
  app.post("/api/permission/", Permission.checkPermission);
}

exports.PermissionRoutes = PermissionRoutes;
