const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  game: {
    type: String,
    required: [true, "Must provide game title"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("Games", gameSchema);
