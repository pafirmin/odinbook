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
  [check("text", "Post text cannot be empty").trim().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      newPost = new Post({
        user: req.user.id,
        name: req.user.name,
        recipient: req.user.id,
        recipientName: req.user.name,
        text: req.body.text,
      });

      await newPost.save();

      newPost.user = user;

      res.json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "500: Server error" }] });
    } finally {
      setTimeout(() => setAlerts([]), 5000);
    }
  }
);

// Post to user's wall
router.post(
  "/users/:user_id",
  auth,
  [check("text", "Post text cannot be empty").trim().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const recipient = await User.findById(req.params.user_id).select(
        "-password"
      );

      const user = await User.findById(req.user.id).select("-password");

      newPost = new Post({
        profilePic: user.profilePic,
        user: req.user.id,
        name: req.user.name,
        recipient: recipient._id,
        recipientName: recipient.fullName,
        text: req.body.text,
      });
      console.log(newPost);

      await newPost.save();

      newPost.user = user;

      res.json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "500: Server error" }] });
    }
  }
);

// Get a post
router.get("/viewpost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", [
      "profilePic",
    ]);

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

// Get posts by user
router.get("/user/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate({
      path: "posts",
      options: { sort: { date: -1 } },
    });

    res.json(user.posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

// Get user's wall posts
router.get("/user/:user_id/wall", async (req, res) => {
  try {
    const posts = await Post.find({ recipient: req.params.user_id })
      .populate("user", ["profilePic"])
      .sort({
        date: -1,
      });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

// Get friends' posts
router.get("/feed", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friends", [
      "status",
      "user",
    ]);

    const friends = user.friends.map((friend) => {
      if (friend.status === "accepted") {
        return friend.user;
      }
    });

    friends.push(user._id);

    const skip = parseInt(req.query.skip);

    const posts = await Post.find({ user: { $in: friends } })
      .sort({
        date: -1,
      })
      .populate("user", ["profilePic"])
      .skip(skip)
      .limit(10);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "500: Server error" });
  }
});

// Like or unlike a post
router.post("/:id/like", auth, async (req, res) => {
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
});

// Comment on a post
router.post(
  "/:id/comment",
  auth,
  [check("text", "Comment text cannot be empty").trim().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);

      const comment = {
        user: req.user.id,
        name: req.user.name,
        text: req.body.text,
      };

      post.comments.push(comment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      res.status(500);
      res.json({ errors: [{ msg: "500: Server error" }] });
    }
  }
);

// Like a comment
router.post("/:post_id/comments/:comment_id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  const comment = post.comments.find(
    (comment) => comment._id.toString() === req.params.comment_id
  );

  if (comment.likes.some((like) => like.user.toString() === req.user.id)) {
    comment.likes = comment.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();

    return res.json(comment.likes);
  }

  comment.likes.unshift({ user: req.user.id });

  await post.save();

  res.json(comment.likes);
});

// Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "500: Server error" });
  }
});

// Delete a comment
router.delete("/:post_id/comments/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ errors: [{ msg: "Comment not found" }] });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "401: Unauthorised" }] });
    }

    const removeIndex = post.comments.map((comment) =>
      comment._id.toString().indexOf(req.params.comment_id)
    );

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "500: Server error" });
  }
});

module.exports = router;
