const User = require("../../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Friend = require("../../models/Friend");
const router = express.Router();
const auth = require("../../middleware/auth");
require("dotenv").config();

// Make a new user
router.post(
  "/",
  [
    check("firstName", "Please provide your first name").not().isEmpty(),
    check("familyName", "Please provide your family name").not().isEmpty(),
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, familyName, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email alreay in use" }] });
      }

      user = await new User({
        firstName,
        familyName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id,
          name: `${user.firstName} ${user.familyName}`,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "500: Server error" }] });
    }
  }
);

// Send friend request
router.post("/:id/add", auth, async (req, res) => {
  try {
    const sender = req.user.id;
    const recipient = req.params.id;

    if (sender === recipient) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Cannot add yourself as a friend!" }] });
    }

    const senderReq = await Friend.findOneAndUpdate(
      {
        user: recipient,
      },
      { $set: { status: "recieved" } },
      { upsert: true, new: true }
    );

    const recipientReq = await Friend.findOneAndUpdate(
      {
        user: sender,
      },
      { $set: { status: "pending" } },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(
      { sender },
      {
        $push: { friends: senderReq },
      }
    );

    await User.findByIdAndUpdate(
      { recipient },
      {
        $push: { friends: recipientReq },
      }
    );

    res.json("Friend request sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Accept friend request
router.post("/:id/accept", auth, async (req, res) => {
  await Friend.findOneAndUpdate(
    {
      user: req.params.id,
    },
    { $set: { status: "accepted" } },
    { upsert: true, new: true }
  );

  await Friend.findOneAndUpdate(
    {
      user: req.user.id,
    },
    { $set: { status: "accepted" } },
    { upsert: true, new: true }
  );

  res.json("Friend accepted");
});

module.exports = router;
