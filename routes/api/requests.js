const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const router = express.Router();

// Get friend requests
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "friends",
      model: "friend",
      populate: { path: "user", model: "user" },
    });

    const requests = user.friends.filter(
      (friend) => friend.status === "recieved"
    );

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Send friend request
router.post("/:id/", auth, async (req, res) => {
  try {
    const sender = req.user.id;
    const recipient = req.params.id;

    if (sender === recipient) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Cannot add yourself as a friend!" }] });
    }

    const toRecipient = await Friend.findOneAndUpdate(
      {
        self: recipient,
        user: sender,
      },
      { $set: { status: "recieved" } },
      { upsert: true, new: true }
    );

    const toSender = await Friend.findOneAndUpdate(
      {
        self: sender,
        user: recipient,
      },
      { $set: { status: "pending" } },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(sender, {
      $addToSet: { friends: toSender },
    });

    await User.findByIdAndUpdate(recipient, {
      $addToSet: { friends: toRecipient },
    });

    res.json(toRecipient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Accept friend request
router.post("/:id/accept", auth, async (req, res) => {
  await Friend.findOneAndUpdate(
    {
      user: req.params.id,
      self: req.user.id,
    },
    { $set: { status: "accepted" } },
    { upsert: true, new: true }
  );

  await Friend.findOneAndUpdate(
    {
      self: req.params.id,
      user: req.user.id,
    },
    { $set: { status: "accepted" } },
    { upsert: true, new: true }
  );

  res.json("Friend accepted");
});

module.exports = router;
