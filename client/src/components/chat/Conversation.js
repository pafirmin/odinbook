import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextInput } from "../utils/Utils";
import { sendMessage } from "../../socket/Socket";
import ChatMessage from "./ChatMessage";
import styled from "styled-components";
import { AlertContext } from "../../contexts/AlertContext";

const ConvoWrapper = styled.div`
  position: fixed;
  color: #000;
  width: 350px;
  left: 70px;
  top: 100px;
  z-index: 5;
  text-align: left;
  cursor: pointer;
`;

const Conversation = ({
  conversation,
  participant,
  setLastMessage,
  setActive,
}) => {
  const { authState } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ text: "" });
  const [isTyping, setIsTyping] = useState(false);
  const scrollBottom = useRef(null);
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
    setIsTyping(false);
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);

      setTimeout(() => setIsTyping(false), 4000);
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

    socket.emit("typing", participant._id);
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
      <ConvoWrapper className="card">
        <div
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            height: "40px",
          }}
          className="handle"
        />
        <header className="bold" style={{ textAlign: "center" }}>
          {participant.fullName}
          <i
            className="far fa-times-circle"
            style={{ position: "absolute", top: "8px", right: "8px" }}
            onClick={() => setActive(false)}
          />
        </header>
        <div
          style={{
            overflowY: "scroll",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid #c3c3c3",
            marginBottom: ".5rem",
          }}
        >
          {messages.map((msg) => (
            <ChatMessage key={msg._id} message={msg} />
          ))}
          <div ref={scrollBottom} />
        </div>
        {isTyping && <span>{participant.firstName} is typing...</span>}
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
