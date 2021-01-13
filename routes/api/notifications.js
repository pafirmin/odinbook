const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Notification = require("../../models/Notification");
const User = require("../../models/User");

// Get notifications
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .limit(20)
      .populate("sender", ["firstName", "familyName", "profilePic"])
      .sort({ date: -1 });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

// Set notifications as seen
router.put("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.updateMany(
      { recipient: req.user.id },
      {
        $set: { seen: true },
      }
    )
      .populate("sender", ["firstName", "familyName", "profilePic"])
      .sort({ date: -1 });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

module.exports = router;
