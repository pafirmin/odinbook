import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const MessageWrapper = styled.div`
  position: relative;
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 1rem;
  margin: 8px 6px 8px 0;
  width: 66%;
  align-self: ${({ sender, user }) =>
    sender === user ? "flex-end" : "flex-start"};
`;

const TimeStamp = styled.time`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%);
  font-size: 0.7rem;
  color: #525252;
  width: 100%;
  text-align: center;
`;

const ChatMessage = ({ message }) => {
  const { authState } = useContext(AuthContext);
  return (
    <MessageWrapper sender={message.sender._id} user={authState.userID}>
      <TimeStamp title={format(parseISO(message.date), "PPPppp")}>
        {formatDistanceToNow(parseISO(message.date), {
          includeSeconds: true,
          addSuffix: true,
        })}
      </TimeStamp>
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
