import io from "socket.io-client";

const server = "http://localhost:8080/";
let socket;

export const connectSocket = (userID) => {
  socket = io.connect(server);

  socket && socket.emit("userID", userID);

  return socket;
};

// Friend requests

export const sendFriendRequest = (request) => {
  socket && socket.emit("friendRequest", request);
};

// Notifications

export const sendNotification = (notification) => {
  socket && socket.emit("notification", notification);
};

// Messages

export const sendMessage = (message, recipientID) => {
  socket && socket.emit("message", message, recipientID);
};

export const disconnectFromSocket = () => {
  socket && socket.disconnect();
};
