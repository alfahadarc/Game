const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Report = new Schema({
  report: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("report", Report);
