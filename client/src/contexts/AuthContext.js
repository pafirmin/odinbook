import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../AuthReducer";
import { connectSocket } from "../socket/Socket";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    token &&
      dispatch({
        type: "login",
        payload: {
          token,
          userID,
        },
      });
    connectSocket(userID);
  }, []);

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
