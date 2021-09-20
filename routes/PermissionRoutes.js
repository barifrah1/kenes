const { Permission } = require("../functions/Permission");

function PermissionRoutes(app) {
  //*****permisison routes*****
  app.get("/api/permission/:mail", Permission.checkPermission);
}

exports.PermissionRoutes = PermissionRoutes;
