const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "friend",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.familyName;
});

UserSchema.virtual("posts", {
  ref: "post",
  foreignField: "user",
  localField: "_id",
});

module.exports = mongoose.model("user", UserSchema);
