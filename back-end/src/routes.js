const reservationsRouter = require("./reservations.router");
const tablesRouter = require("./tables.router");

function routeNotFound(req, res, next) {
  next({
    status: 404,
    message: `${req.originalUrl} not found`,
  });
}

module.exports = function (app) {
  app.use("/reservations", reservationsRouter);
  app.use("/tables", tablesRouter);
  app.use("/", (req, res, next) => { // Add this line
    res.json({ message: "Welcome to the Periodic Tables API!" }); // Customize the message as needed
  });
  app.use(routeNotFound);
};