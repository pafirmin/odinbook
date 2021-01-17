import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, PostArea } from "../../utils/Utils";
import { sendMessage } from "../../../socket/Socket";
import { AlertContext } from "../../../contexts/AlertContext";

const MessageForm = ({ recipientID }) => {
  const [newMessage, setNewMessage] = useState({ text: "" });
  const { setAlerts } = useContext(AlertContext);

  const handleChange = (e) => {
    setNewMessage({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(newMessage);

      const res = await axios.post(`/api/messaging/send/${recipientID}`, body);
      setNewMessage({ text: "" });

      sendMessage(res.data, recipientID);
      setAlerts([{ text: "Message sent", type: "success" }]);
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
    <form onSubmit={handleSubmit} className="card">
      <PostArea
        name="text"
        rows={3}
        placeholder="Your message here..."
        value={newMessage.text}
        onChange={(e) => handleChange(e)}
      />
      <Button>
        Send <i className="fas fa-angle-right"></i>
      </Button>
    </form>
  );
};

export default MessageForm;
