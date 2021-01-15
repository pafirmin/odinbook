import React, { Fragment, useState } from "react";
import Conversation from "../chat/Conversation";
import { truncate } from "lodash";

const MessagesListItem = ({ convo, participant }) => {
  const [active, setActive] = useState(false);
  const [lastMessage, setLastMessage] = useState(convo.lastMessage);

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <Fragment>
      <li
        onClick={toggleActive}
        style={{
          position: "relative",
          cursor: "pointer",
          padding: "6px 0",
          borderBottom: "1px solid #c6c6c6",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", gap: ".5rem" }}>
          <img
            className="small round thumbnail"
            src={lastMessage.sender.profilePic}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="bold">{participant.fullName}</p>
            {lastMessage.sender.fullName}:{" "}
            {truncate(lastMessage.text, { length: 24, omission: "..." })}
          </div>
        </div>
      </li>
      {active && (
        <Conversation
          conversation={convo}
          participant={participant}
          setLastMessage={setLastMessage}
          setActive={setActive}
        />
      )}
    </Fragment>
  );
};

export default MessagesListItem;
