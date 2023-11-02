const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.testFunc);
routes.use("/games", require("./games"));

module.exports = routes;
