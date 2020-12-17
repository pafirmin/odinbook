const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");

// Make a post
router.post(
  "/",
  auth,
  [check("text").trim().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      console.log(user);

      newPost = new Post({
        user: req.user.id,
        name: user.fullName,
        text: req.body.text,
      });

      await newPost.save();

      res.json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "500: Server error" }] });
    }
  }
);

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "posts",
      options: { sort: { date: -1 } },
    });

    res.json(user.posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

module.exports = router;
