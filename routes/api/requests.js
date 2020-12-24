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

module.exports = router;
