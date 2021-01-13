import io from "socket.io-client";

const server = "http://localhost:8080/";
let socket;

export const connectSocket = (userID) => {
  socket = io.connect(server);

  socket && socket.emit("userID", userID);
};

// Friend requests

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

// Notifications

export const sendNotification = (notification) => {
  socket && socket.emit("notification", notification);
};

export const listenForNotifications = (setNotifications) => {
  socket &&
    socket.on("recieveNotification", (newNotification) => {
      setNotifications((prevState) => [newNotification, ...prevState]);
    });
};

// Messages

export const sendMessage = (message, recipientID) => {
  socket && socket.emit("message", message, recipientID);
};

export const listenForMessages = (setMessages, setLastMessage) => {
  socket &&
    socket.on("recieveMessage", (newMessage) => {
      setMessages((prevState) => [...prevState, newMessage]);

      setLastMessage(newMessage);
    });
};

export const disconnectFromSocket = () => {
  socket && socket.disconnect();
};
