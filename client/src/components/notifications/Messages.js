import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { DropDown, Notification } from "../utils/Utils";
import MessagesListItem from "./MessagesListItem";

const Messages = ({ activeDropdown, toggleDropdown }) => {
  const { authState } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [icon, setIcon] = useState("fas fa-envelope");
  const [unreadMessage, setUnreadMessage] = useState(false);

  const handleNewMessage = () => {
    setUnreadMessage(true);
  };

  useEffect(() => {
    setIcon(activeDropdown === 1 ? "fas fa-envelope-open" : "fas fa-envelope");
  }, [activeDropdown]);

  useEffect(() => {
    activeDropdown === 1 && fetchConversations();
  }, [activeDropdown]);

  useEffect(() => {
    setUnreadMessage(conversations.some((convo) => !convo.lastMessage.seen));
  }, [conversations]);

  useEffect(() => {
    const { socket } = authState;
    socket.on("recieveMessage", handleNewMessage);

    return () => socket.off("recieveMessage", handleNewMessage);
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`/api/messaging`);

      setConversations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div>
        <i
          style={{ fontSize: "1.2em", cursor: "pointer" }}
          className={icon}
          onClick={toggleDropdown}
        />
        {unreadMessage && <Notification />}
        {activeDropdown === 1 && (
          <DropDown style={{ overflow: "visible" }}>
            <ul>
              {conversations.map((convo) => (
                <MessagesListItem
                  key={convo._id}
                  convo={convo}
                  currentUser={authState.userID}
                />
              ))}
            </ul>
          </DropDown>
        )}
      </div>
    </div>
  );
};

export default Messages;
