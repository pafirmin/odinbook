const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");
const Notification = require("./models/Notification");
const helmet = require("helmet");
const path = require("path");

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
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/search", require("./routes/api/search"));
app.use("/api/requests", require("./routes/api/requests"));
app.use("/api/notifications", require("./routes/api/notifications"));
app.use("/api/messaging", require("./routes/api/messaging"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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

  socket.on("friendRequest", (request) => {
    const userSocket = users[request.self];

    userSocket &&
      socket.broadcast.to(userSocket).emit("recieveRequest", request);
  });

  socket.on("notification", async (notification) => {
    if (notification.sender === notification.recipient) return;

    const newNotification = await Notification.findOneAndUpdate(
      notification,
      { $setOnInsert: notification },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("sender", ["firstName", "familyName", "profilePic"]);

    const recipientID = notification.recipient;
    const userSocket = users[recipientID];

    userSocket &&
      socket.broadcast
        .to(userSocket)
        .emit("recieveNotification", newNotification);
  });

  socket.on("message", (message, recipientID) => {
    const userSocket = users[recipientID];

    userSocket &&
      socket.broadcast.to(userSocket).emit("recieveMessage", message);
  });

  socket.on("typing", (recipientID) => {
    const userSocket = users[recipientID];

    userSocket && socket.broadcast.to(userSocket).emit("typing");
  });

  io.on("disconnect", (socket) => {
    for (const socketID in users) {
      if (users[socketID] === socket.id) delete users[socketID];
    }
  });
});
