const User = require("../../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Friend = require("../../models/Friend");
const auth = require("../../middleware/auth");
require("dotenv").config();
const router = express.Router();

// Get current user
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("friends");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("friends");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Make a new user
router.post(
  "/",
  [
    check("firstName", "Please provide your first name").not().isEmpty(),
    check("familyName", "Please provide your family name").not().isEmpty(),
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Password must be at least 6 characters")
      .trim()
      .isLength({
        min: 6,
      })
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          throw new Error("Passwords do not match");
        } else {
          return value;
        }
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

// Update profile
router.post("/profile", auth, async (req, res) => {
  try {
    const { location, bio, occupation } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profile: {
          location,
          bio,
          occupation,
        },
      },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

module.exports = router;
