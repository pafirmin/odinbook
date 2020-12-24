const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
mongoose.set("useCreateIndex", true);

connectDB();

app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/search", require("./routes/api/search"));
app.use("/api/requests", require("./routes/api/requests"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
