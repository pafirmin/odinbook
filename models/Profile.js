const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
