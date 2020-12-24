const express = require("express");
const User = require("../../models/User");
const router = express.Router();

// Search for user
router.post("/", async (req, res) => {
  try {
    const query = req.body.query;

    const user = await User.find({ $text: { $search: query } });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
