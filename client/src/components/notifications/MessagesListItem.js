import React, { useState } from "react";
import Conversation from "../chat/Conversation";

const MessagesListItem = ({ convo, participant }) => {
  const [active, setActive] = useState(false);
  const [lastMessage, setLastMessage] = useState(convo.lastMessage);

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <li style={{ position: "relative" }}>
      <p className="bold" onClick={toggleActive}>
        {participant.fullName}
      </p>
      {lastMessage.sender.fullName}: {lastMessage.text}
      {active && (
        <Conversation
          conversation={convo}
          participant={participant}
          setLastMessage={setLastMessage}
        />
      )}
    </li>
  );
};

export default MessagesListItem;
