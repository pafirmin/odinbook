const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const helmet = require("helmet");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
mongoose.set("useCreateIndex", true);

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb" }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/search", require("./routes/api/search"));
app.use("/api/requests", require("./routes/api/requests"));
app.use("/api/notifications", require("./routes/api/notifications"));
app.use("/api/messaging", require("./routes/api/messaging"));

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

const users = {};
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("userID", (userID) => {
    users[userID] = socket.id;
  });

  socket.on("friendRequest", async (request) => {
    const userSocket = users[request.self];

    userSocket &&
      socket.broadcast.to(userSocket).emit("recieveRequest", request);
  });

  socket.on("notification", async (notification) => {
    const { sender, recipientID, post, type } = notification;
    if (sender === recipientID) return;

    await User.findByIdAndUpdate(
      recipientID,
      {
        $addToSet: { notifications: { sender, post, type } },
      },
      { new: true }
    );
    const userSocket = users[recipientID];

    userSocket && socket.broadcast.to(userSocket).emit("recieveNotification");
  });

  io.on("disconnect", (socket) => {
    for (const socketID in users) {
      if (users[socketID] === socket.id) delete users[socketID];
    }
  });
});
