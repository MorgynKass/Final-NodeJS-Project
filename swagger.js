const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My Game API",
    description: "An API that shows game data.",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputfile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

//Run to
swaggerAutogen(outputfile, endpointFiles, doc);

//Generates the swagger.json file
swaggerAutogen(outputfile, endpointFiles, doc).then(async () => {
  await import("./server.js");
});
