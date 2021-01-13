import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { DropDown, Notification } from "../utils/Utils";
import MessagesListItem from "./MessagesListItem";

const Messages = () => {
  const { authState } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [icon, setIcon] = useState("fas fa-envelope");

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const unreadConvos = conversations.reduce(
      (count, convo) => (convo.lastMessage.seen ? count : count + 1),
      0
    );
    setUnreadCount(conversations.length);
  }, [conversations]);

  const fetchConversations = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${authState.token}`,
        },
      };

      const res = await axios.get(`/api/messaging`, config);

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
        {unreadCount > 0 && <Notification>{unreadCount}</Notification>}
        <DropDown show={showDropDown} style={{ overflow: "visible" }}>
          <ul>
            {conversations.map((convo) => (
              <MessagesListItem
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
