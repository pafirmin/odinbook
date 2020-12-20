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

// Like or unlike a post
router.post(
  "/:id/like",
  auth,
  [check("text", "Message cannot be empty").trim().not().isEmpty()],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Unlike post if already liked
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        post.likes = post.likes.filter(
          (like) => like.user._id.toString() !== req.user.id
        );
        await post.save();

        return res.json(post.likes);
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
    } catch (err) {
      res.status(500);
      res.json({ errors: [{ msg: "500: Server error" }] });
    }
  }
);

// Comment on a post
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = {
      user: req.user.id,
      name: req.user.name,
      text: req.body.text,
    };

    post.comments.push(comment);

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500);
    res.json({ errors: [{ msg: "500: Server error" }] });
  }
});

module.exports = router;
