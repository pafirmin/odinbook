import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [activeChats, setActiveChats] = useState([]);

  return (
    <ChatContext.Provider value={[activeChats, setActiveChats]}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
