import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { DropDown, Notification } from "../utils/Utils";
import MessagesListItem from "./MessagesListItem";

const Messages = () => {
  const { authState } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const [icon, setIcon] = useState("fas fa-envelope");
  const [unreadMessage, setUnreadMessage] = useState(false);

  const handleNewMessage = () => {
    setUnreadMessage(true);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

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

  const toggleDropDown = () => {
    !showDropDown && fetchConversations();
    setIcon(showDropDown ? "fas fa-envelope" : "fas fa-envelope-open");
    setShowDropdown(!showDropDown);
  };

  const getParticipant = (participants) => {
    return participants.find((user) => user._id !== authState.userID);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div>
        <i
          style={{ fontSize: "1.2em", cursor: "pointer" }}
          className={icon}
          onClick={toggleDropDown}
        />
        {unreadMessage && <Notification />}
        <DropDown show={showDropDown} style={{ overflow: "visible" }}>
          <ul>
            {conversations.map((convo) => (
              <MessagesListItem
                key={convo._id}
                convo={convo}
                participant={getParticipant(convo.participants)}
              />
            ))}
          </ul>
        </DropDown>
      </div>
    </div>
  );
};

export default Messages;
