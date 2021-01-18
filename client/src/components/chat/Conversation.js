import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextInput } from "../utils/Utils";
import { sendMessage } from "../../socket/Socket";
import styled from "styled-components";
import ChatMessage from "./ChatMessage";

const ConvoWrapper = styled.div`
  position: fixed;
  width: 350px;
  left: 70px;
  top: 100px;
  z-index: 5;
  text-align: left;
  background: #fff;
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
  height: 400px;
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
  setLastMessage,
  setActive,
}) => {
  const scrollBottom = useRef(null);
  const { authState } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ text: "" });
  const [partnerIsTyping, setPartnerIsTyping] = useState(false);
  const { socket } = authState;

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("recieveMessage", handleRecieveMessage);

    return () => socket.off("recieveMessage", handleRecieveMessage);
  }, []);

  useEffect(() => {
    socket.on("typing", handleTyping);

    return () => socket.off("typing", handleTyping);
  }, []);

  useEffect(() => {
    scrollBottom.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRecieveMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);

    setLastMessage(newMessage);
    setPartnerIsTyping(false);
  };

  const handleTyping = () => {
    if (!partnerIsTyping) {
      setPartnerIsTyping(true);

      setTimeout(() => setPartnerIsTyping(false), 4000);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/messaging/chats/${conversation._id}`);

      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewMessage({ text: e.target.value });

    !partnerIsTyping && socket.emit("typing", participant._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(newMessage);

      const res = await axios.post(
        `/api/messaging/send/${participant._id}`,
        body
      );

      setMessages([...messages, res.data]);
      setLastMessage(res.data);
      setNewMessage({ text: "" });

      sendMessage(res.data, participant._id);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    } finally {
      setTimeout(() => setAlerts([]), 5000);
    }
  };

  return (
    <Draggable handle=".handle">
      <ConvoWrapper>
        <ConvoHeader className="bold handle">
          {participant.fullName}
          <i className="far fa-times-circle" onClick={() => setActive(false)} />
        </ConvoHeader>
        <ConvoBody>
          {messages.map((msg) => (
            <ChatMessage key={msg._id} message={msg} />
          ))}
          <div ref={scrollBottom} />
        </ConvoBody>
        {partnerIsTyping && <span>{participant.firstName} is typing...</span>}
        <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex" }}>
          <TextInput
            autoComplete="off"
            type="text"
            name="text"
            value={newMessage.text}
            onChange={(e) => handleChange(e)}
            style={{ flexGrow: "1" }}
          />
          <Button>Send</Button>
        </form>
      </ConvoWrapper>
    </Draggable>
  );
};

export default Conversation;
