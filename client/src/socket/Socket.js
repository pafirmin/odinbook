import io from "socket.io-client";

const server = "http://localhost:8080/";
let socket;

export const connectSocket = (userID) => {
  socket = io.connect(server);

  socket.emit("userID", userID);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendFriendRequest = (request) => {
  socket.emit("friendRequest", request);
};

export const listenForRequests = (setRequests) => {
  socket.on("recieveRequest", (request) =>
    setRequests((state) => {
      return [request, ...state];
    })
  );
};
