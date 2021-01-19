import React, { useContext, useState } from "react";
import { sendMessage } from "../../socket/Socket";
import axios from "axios";
import { AlertContext } from "../../contexts/AlertContext";
import { Button, TextInput } from "../utils/Utils";

const ConversationInput = ({ socket, setMessages, participant }) => {
  const [newMessage, setNewMessage] = useState({ text: "" });
  const { setAlerts } = useContext(AlertContext);

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

      setMessages((prev) => [...prev, res.data]);
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
    <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex" }}>
      <TextInput
        aria-label="Message text"
        autoComplete="off"
        type="text"
        name="text"
        value={newMessage.text}
        onChange={(e) => handleChange(e)}
        style={{ flexGrow: "1" }}
      />
      <Button>Send</Button>
    </form>
  );
};

export default ConversationInput;
