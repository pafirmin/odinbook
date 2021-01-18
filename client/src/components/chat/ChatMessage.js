import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const MessageWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.secondaryBg};
  color: ${(props) => props.theme.mainFontColour};
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
  color: ${(props) => props.theme.secondaryFontColour};
  width: 100%;
  text-align: center;
`;

const MessageContainer = styled.div`
  background: ${(props) => props.theme.secondaryBg};
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
      <div>
        <img className="tiny round thumbnail" src={message.sender.profilePic} />{" "}
        {message.text}
      </div>{" "}
    </MessageWrapper>
  );
};

export default ChatMessage;
