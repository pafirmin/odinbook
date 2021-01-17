const User = require("../../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const Friend = require("../../models/Friend");
const axios = require("axios");
const { cloudinary } = require("../../cloud");
const auth = require("../../middleware/auth");
const router = express.Router();
const { sample } = require("lodash");
require("dotenv").config();

// Get current user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate({ path: "friends", populate: "user" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get current user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user.profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -notifications")
      .populate({
        path: "friends",
        populate: [
          { path: "user", select: "firstName familyName profilePic profile" },
        ],
      });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get a user's friends
router.get("/:id/friends", async (req, res) => {
  try {
    const friends = await Friend.find({ self: req.params.id }).populate({
      path: "user",
      populate: "friends",
    });

    res.json(friends);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Make a new user
router.post(
  "/",
  [
    check("firstName", "Please provide your first name!")
      .trim()
      .not()
      .isEmpty(),
    check("familyName", "Please provide your family name!")
      .trim()
      .not()
      .isEmpty(),
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

      const profilePic = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "identicon",
      });

      user = new User({
        firstName,
        familyName,
        email,
        password,
        profilePic,
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
          res.json({
            token,
            userID: user._id,
            userName: `${user.firstName} ${user.familyName}`,
          });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "500: Server error" }] });
    }
  }
);

// Update profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { location, bio, occupation, image } = req.body;

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

    if (image) {
      const fileString = req.body.image;
      const uploadResponse = await cloudinary.uploader.upload(fileString, {
        upload_preset: "odinbook-profile-pics",
      });

      user.profilePic = uploadResponse.url;

      await user.save();
    }

    res.json(user._id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

router.post("/:id/profilepic", async (req, res) => {
  try {
    const user = await axios.get("https://randomuser.me/api/");

    const profilePic = user.data.results[0].picture.large;
    const firstName = user.data.results[0].name.first;
    const familyName = user.data.results[0].name.last;
    const location = user.data.results[0].location.country;

    await User.findByIdAndUpdate(req.params.id, {
      profile: { location: location },
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/random", async (req, res) => {
  try {
    const user = await axios.get("https://randomuser.me/api/");

    const profilePic = user.data.results[0].picture.large;
    const firstName = user.data.results[0].name.first;
    const familyName = user.data.results[0].name.last;
    const email = user.data.results[0].email;
    const password = "123456";
    const profile = {
      location: user.data.results[0].location.country,
      occupation: sample([
        "Builder",
        "Bartender",
        "Lion Tamer",
        "Journalist",
        "Photographer",
      ]),
      bio: "Hi, I'm using Odinbook",
    };

    const newUser = new User({
      profilePic,
      firstName,
      familyName,
      email,
      profile,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
  }
});

router.put("/acceptall", async (req, res) => {
  const friends = await Friend.updateMany({}, { $set: { status: "accepted" } });

  res.json(friends);
});
module.exports = router;
