const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// Get notifications
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("notifications.sender", ["firstName", "familyName"])
      .select("-password");

    user.notifications.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    res.json(user.notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

// Set notifications as seen
router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $set: { "notifications.$[].seen": true },
    })
      .populate("notifications.sender", ["firstName", "familyName"])
      .select("-password");

    user.notifications.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    res.json(user.notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

module.exports = router;
