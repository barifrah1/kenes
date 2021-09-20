const { Sadna } = require("../functions/Sadna");

function SadnaRoutes(app) {
  /*returns all sadnaot details by rang for sadnaotForm component */
  app.get("/api/sadnaot", Sadna.getSadnaot);
  app.get("/api/sadnaot?available=true", Sadna.getSadnaot);
}

exports.SadnaRoutes = SadnaRoutes;
