import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";
import ChatMessage from "./ChatMessage";
import ConversationInput from "./ConversationInput";
import { useMediaQuery } from "react-responsive";

const ConvoWrapper = styled.div`
  position: fixed;
  width: ${(props) => (props.isMobile ? "100%" : "350px")};
  left: ${(props) => (props.isMobile ? 0 : 50 * props.offset + 70)}px;
  top: ${(props) => (props.isMobile ? 0 : 50 * props.offset + 100)}px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  text-align: left;
  box-shadow: 0px 1px 2px #9d9d9d;
`;

const ConvoHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.theme.headerColour};
  color: #fff;
  padding: 0.6rem;
  font-size: 1.2rem;
`;

const ConvoBody = styled.div`
  overflow-y: scroll;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  background: ${(props) => props.theme.cardBg};
  scrollbar-color: #bbb ${(props) => props.theme.cardBg};
  scrollbar-width: thin;
`;

const Conversation = ({
  conversation,
  participant,
  setActiveChats,
  offset,
}) => {
  const scrollToBottom = useRef(null);
  const { authState } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [partnerIsTyping, setPartnerIsTyping] = useState(false);
  const { socket } = authState;
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messaging/chats/${conversation._id}`);

        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("recieveMessage", handleRecieveMessage);

    return () => socket.off("recieveMessage", handleRecieveMessage);
  }, []);

  useEffect(() => {
    socket.on("typing", handlePartnerTyping);

    return () => socket.off("typing", handlePartnerTyping);
  }, []);

  useEffect(() => {
    scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRecieveMessage = (newMessage) => {
    newMessage.seen = true;
    setMessages((prev) => [...prev, newMessage]);

    setPartnerIsTyping(false);
  };

  const handlePartnerTyping = () => {
    if (!partnerIsTyping) {
      setPartnerIsTyping(true);

      setTimeout(() => setPartnerIsTyping(false), 4000);
    }
  };

  const handleClose = () => {
    setActiveChats((prev) =>
      prev.filter((chat) => chat._id !== conversation._id)
    );
  };

  return (
    <Draggable handle=".handle">
      <ConvoWrapper offset={offset} isMobile={isMobile}>
        <ConvoHeader className="bold handle">
          {participant.fullName}
          <i className="far fa-times-circle" onClick={handleClose} />
        </ConvoHeader>
        <ConvoBody>
          {messages.map((msg) => (
            <ChatMessage key={msg._id} message={msg} />
          ))}
          <div ref={scrollToBottom} />
        </ConvoBody>
        {partnerIsTyping && <span>{participant.firstName} is typing...</span>}
        <ConversationInput
          socket={socket}
          setMessages={setMessages}
          participant={participant}
        ></ConversationInput>
      </ConvoWrapper>
    </Draggable>
  );
};

export default Conversation;
