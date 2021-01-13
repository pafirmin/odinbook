import { connectSocket, disconnectFromSocket } from "./socket/Socket";

const authReducer = (authState, action) => {
  switch (action.type) {
    case "login":
      const { token, userID, userName } = action.payload;
      connectSocket(userID);
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);
      localStorage.setItem("userName", userName);
      return {
        ...authState,
        isAuthenticated: true,
        token,
        userID,
        userName,
      };
    case "logout":
      localStorage.clear();
      disconnectFromSocket();
      return {
        ...authState,
        isAuthenticated: false,
      };
    default:
      return authState;
  }
};

export default authReducer;
