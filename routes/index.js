const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.testFunc);
routes.use("/games", require("./games"));
routes.use("/", require("./swagger"));

module.exports = routes;
