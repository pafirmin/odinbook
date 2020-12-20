const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
    },
  ],
  occupation: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
