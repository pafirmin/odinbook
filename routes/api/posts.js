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

// Get posts by user
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

// Like a post
router.post("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.likes.some((like) => like.user.toString() === req.user.id)) {
    return res
      .status(400)
      .json({ errors: [{ msg: "You have already liked this post!" }] });
  }

  post.likes.unshift(req.user.id);

  await post.save();

  res.json(post.likes);
});

module.exports = router;
