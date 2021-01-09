const jwt = require("jsonwebtoken");

// Decode webtoken from header
module.exports = (req, res, next) => {
  try {
    const bearer = req.headers["authorization"].split(" ");
    const token = bearer[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "401: Unauthorized" });
  }
};
