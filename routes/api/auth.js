const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Get current user from jwt
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

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
});

router.post("/guest", async (req, res) => {
  try {
    const user = await User.findOne({ email: "lukas.thomas@example.com" });

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
  } catch (error) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

module.exports = router;
