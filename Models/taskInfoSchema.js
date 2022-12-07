const mongoose = require("mongoose");

const taskCollection = mongoose.Schema({
  title: {
    type: String,
  },
  tag: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  complete: {
    type: Boolean,
  },
  pin: {
    type: Boolean,
  },
});

const taskInfoSchema = mongoose.model("todo", taskCollection);

module.exports = taskInfoSchema;
