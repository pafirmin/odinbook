import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { truncate } from "lodash";
import { ChatContext } from "../../contexts/ChatContext";
import { useMediaQuery } from "react-responsive";

const MessagesListItem = ({ convo, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(convo.lastMessage);
  const [activeChats, setActiveChats] = useContext(ChatContext);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    isMobile && setActiveChats([]);
  }, [isMobile]);

  const toggleActive = () => {
    if (activeChats.includes(convo)) {
      setActiveChats(activeChats.filter((chat) => chat._id !== convo._id));
    } else {
      setActiveChats([...activeChats, convo]);
    }
  };

  const toggleActiveMobile = () => {
    setActiveChats([convo]);
  };

  const getParticipant = useCallback(() => {
    return convo.participants.find((user) => user._id !== currentUser);
  }, []);

  return (
    <Fragment>
      <li
        onClick={isMobile ? toggleActiveMobile : toggleActive}
        style={{
          position: "relative",
          cursor: "pointer",
          padding: "6px 0",
          borderBottom: "1px solid #c6c6c6",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: ".5rem",
          }}
        >
          <img
            className="small round thumbnail"
            src={getParticipant().profilePic}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="bold">{getParticipant().fullName}</p>
            {lastMessage.sender.fullName}:{" "}
            {truncate(lastMessage.text, { length: 24, omission: "..." })}
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default MessagesListItem;
