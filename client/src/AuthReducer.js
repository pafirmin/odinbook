const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      const token = action.payload.token;
      const userID = action.payload.userID;

      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);
      return {
        ...state,
        isAuthenticated: true,
        token: token,
        userID: userID,
      };
    case "logout":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
