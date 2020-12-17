const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      likes: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);