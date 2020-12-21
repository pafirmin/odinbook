const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      const token = action.payload.token;
      localStorage.setItem("token", token);
      return {
        ...state,
        isAuthenticated: true,
        token: token,
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
