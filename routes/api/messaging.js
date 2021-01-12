const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Message = require("../../models/Message");
const User = require("../../models/User");
const Conversation = require("../../models/Conversation");

// Send message
router.post("/:userID", auth, async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.id,
      text: req.body.text,
    });

    const conversation = await Conversation.findOneAndUpdate(
      {
        participants: {
          $all: [
            { $elemMatch: { $eq: req.user.id } },
            { $elemMatch: { $eq: req.params.userID } },
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

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// Get conversations
router.get("/chats", auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    }).populate({
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
    const messages = await Message.find({ conversation: req.params.id });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
