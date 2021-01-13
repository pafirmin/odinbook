import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextInput } from "../utils/Utils";
import {
  disconnectFromSocket,
  listenForMessages,
  sendMessage,
} from "../../socket/Socket";

const Conversation = ({ conversation, participant, setLastMessage }) => {
  const { authState } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ text: "" });
  const scrollBottom = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    listenForMessages(setMessages, setLastMessage);

    return () => disconnectFromSocket();
  }, []);

  useEffect(() => {
    scrollBottom.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e) => {
    setNewMessage({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `bearer ${authState.token}`,
        },
      };

      const res = await axios.post(
        `/api/messaging/send/${participant._id}`,
        newMessage,
        config
      );

      setMessages([...messages, res.data]);
      setNewMessage({ text: "" });
      setLastMessage(res.data);

      sendMessage(res.data, participant._id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${authState.token}`,
        },
      };

      const res = await axios.get(
        `/api/messaging/chats/${conversation._id}`,
        config
      );

      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="card"
      style={{
        position: "absolute",
        color: "#000",
        width: "300px",
        left: "-300px",
        top: "0",
        zIndex: "5",
        textAlign: "left",
      }}
    >
      <div
        style={{ overflowY: "scroll", height: "500px", scrollbarColor: "#000" }}
      >
        {messages.map((msg) => (
          <div>
            <div
              style={{
                display: "flex",
                alignContent: "space-between",
              }}
            >
              <img
                className="tiny round thumbnail"
                src={msg.sender.profilePic}
              />{" "}
              {msg.sender.fullName}:
            </div>{" "}
            {msg.text}
          </div>
        ))}
        <div ref={scrollBottom} />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex" }}>
        <TextInput
          type="text"
          name="text"
          value={newMessage.text}
          onChange={(e) => handleChange(e)}
        />
        <Button>Send</Button>
      </form>
    </div>
  );
};

export default Conversation;
