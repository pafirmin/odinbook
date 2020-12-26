const express = require("express");
const User = require("../../models/User");
const router = express.Router();

// Search for user
router.post("/", async (req, res) => {
  try {
    const query = req.body.query;

    const users = await User.find({ $text: { $search: query } });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const query = req.query.user;

    const users = await User.find({ $text: { $search: query } }).select(
      "-password"
    );

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
