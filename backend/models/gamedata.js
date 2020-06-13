const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameData = new Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("gamedata", GameData);
