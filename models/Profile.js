const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },

  status: {
    type: String,
    required: true,
    max: 40
  },
  WebSite: {
    type: String
  },
  location: {
    type: String
  },

  bio: {
    type: String
  },

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  cats: [
    {
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
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
