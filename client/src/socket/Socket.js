import io from "socket.io-client";

const server = "http://localhost:8080/";
let socket;

export const connectSocket = (userID) => {
  socket = io.connect(server);

  socket && socket.emit("userID", userID);
};

export const sendFriendRequest = (request) => {
  socket && socket.emit("friendRequest", request);
};

export const listenForRequests = (setRequests) => {
  socket &&
    socket.on("recieveRequest", (request) =>
      setRequests((state) => {
        return [request, ...state];
      })
    );
};

export const sendNotification = (notification) => {
  socket && socket.emit("notification", notification);
};

export const listenForNotifications = (callback) => {
  socket &&
    socket.on("recieveNotification", () => {
      callback();
    });
};

export const disconnectFromSocket = () => {
  socket && socket.disconnect();
};
