const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");
const mongoose = require("mongoose");

// Send message
router.post("/send/:userID", auth, async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.id,
      text: req.body.text,
    });

    const conversation = await Conversation.findOneAndUpdate(
      {
        participants: {
          $all: [
            { $elemMatch: { $eq: mongoose.Types.ObjectId(req.user.id) } },
            { $elemMatch: { $eq: mongoose.Types.ObjectId(req.params.userID) } },
          ],
        },
      },
      {
        $set: { lastMessage: message._id },
        $setOnInsert: { participants: [req.user.id, req.params.userID] },
      },
      { upsert: true, new: true }
    );

    message.conversation = conversation._id;

    await message.save();

    await Message.populate(message, {
      path: "sender",
      select: "firstName familyName profilePic",
    });
    console.log(message);

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// Get conversations
router.get("/", auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate("participants", ["firstName", "familyName"])
      .populate({
        path: "lastMessage",
        populate: [{ path: "sender", select: "firstName familyName" }],
      });

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// Get messages from a conversation
router.get("/chats/:id", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.id,
    }).populate("sender", ["firstName", "familyName", "profilePic"]);

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
