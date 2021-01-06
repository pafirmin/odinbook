import { connectSocket, disconnectFromSocket } from "./socket/Socket";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      const { token, userID, userName } = action.payload;
      connectSocket(userID);
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);
      localStorage.setItem("userName", userName);
      return {
        ...state,
        isAuthenticated: true,
        token,
        userID,
        userName,
      };
    case "logout":
      localStorage.clear();
      disconnectFromSocket();
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
