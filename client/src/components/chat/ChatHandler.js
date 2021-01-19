import React, { Fragment, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import Conversation from "./Conversation";

const ChatHandler = () => {
  const [activeChats, setActiveChats] = useContext(ChatContext);
  const { authState } = useContext(AuthContext);

  const getParticipant = (participants) => {
    return participants.find((user) => user._id !== authState.userID);
  };

  return (
    <Fragment>
      {activeChats.map((chat, i) => (
        <Conversation
          key={chat._id}
          conversation={chat}
          participant={getParticipant(chat.participants)}
          setActiveChats={setActiveChats}
          offset={i}
        />
      ))}
    </Fragment>
  );
};

export default ChatHandler;
