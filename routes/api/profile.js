const express = require("express");
const Profile = require("../../models/Profile");
const router = express.Router();
const auth = require("../../middleware/auth");

// Create or update profile
router.post("/", auth, async (req, res) => {
  try {
    const { location, bio, education, occupation } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          location,
          bio,
          education,
          occupation,
        },
      },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "500: Server error" }] });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "familyName"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
