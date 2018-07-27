const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const CatsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  photo: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  telephone: {
    Type: String
  },
  email: {
    Type: String
  },

  description: {
    type: String,
    required: true
  },
  fivN: {
    type: Boolean,
    required: true,
    default: false
  },
  felvN: {
    type: Boolean,
    required: true,
    default: false
  },

  needAdoption: {
    type: Boolean,
    default: false
  },
  race: {
    type: String,
    required: true
  },
  vaxins: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cats = mongoose.model("cats", CatsSchema);
