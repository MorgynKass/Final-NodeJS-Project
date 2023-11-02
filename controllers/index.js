const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const asyncWrapper = require("../middleware/async");

// test function
const testFunc = (req, res) => {
  res.send("Test is working!");
};

// gets all games in the database
const getAllGames = asyncWrapper(async (req, res) => {
  const response = await mongodb.getDb().db().collection("game").find({});
  response.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list);
  });
});

// gets a sinle game in the database
const getSingleGame = asyncWrapper(async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("game")
    .find({ _id: gameId });
  response.toArray().then((list) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list[0]);
  });
});

// adds a game to the database
const addGame = asyncWrapper(async (req, res) => {
  const game = {
    game: req.body.game,
    completed: req.body.completed,
  };

  if (game.game == null) {
    throw "Please specify game.";
  }
  if (game.completed == null) {
    throw "Please specify if the game is completed.";
  }

  const response = await mongodb
    .getDb()
    .db()
    .collection("game")
    .insertOne(game);
  if (response.acknowledged) {
    res.status(200).json(game);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while adding game.");
  }
});

// update game in database
const updateGame = asyncWrapper(async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const game = {
    game: req.body.game,
    completed: req.body.completed,
  };

  if (game.game == null) {
    throw "Please specify game.";
  }
  if (game.completed == null) {
    throw "Please specify if the game is completed.";
  }

  const response = await mongodb
    .getDb()
    .db()
    .collection("game")
    .replaceOne({ _id: gameId }, game);
  if (response.acknowledged) {
    res.status(200).json(game);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while adding game.");
  }
});

// delete game in database
const deleteGame = asyncWrapper(async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("game")
    .deleteOne({ _id: gameId });
  if (response.acknowledged) {
    res.status(200).json("Game was deleted.");
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while adding game.");
  }
});

module.exports = {
  testFunc,
  getAllGames,
  getSingleGame,
  addGame,
  updateGame,
  deleteGame,
};
