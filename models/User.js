const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  birthday: {
    type: Date
  },

  sex: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
