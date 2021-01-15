import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

const MessageWrapper = styled.div`
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 1rem;
  margin: 8px 6px 8px 0;
  width: 66%;
  align-self: ${({ sender, user }) =>
    sender === user ? "flex-end" : "flex-start"};
`;

const ChatMessage = ({ message }) => {
  const { authState } = useContext(AuthContext);
  return (
    <MessageWrapper sender={message.sender._id} user={authState.userID}>
      <div
        style={{
          display: "flex",
          alignContent: "space-between",
          gap: ".3rem",
        }}
      >
        <img className="tiny round thumbnail" src={message.sender.profilePic} />{" "}
        {message.text}
      </div>{" "}
    </MessageWrapper>
  );
};

export default ChatMessage;
