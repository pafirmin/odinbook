import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const chatID = useParams()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${authState.token}`,
        },
      };

      const res = await axios.get(`/api/messaging/chats/${chatID}`)

      setMessages(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  return <div></div>;
};

export default Conversation;
