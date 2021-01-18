import React from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TimeStamp = styled.time`
  color: ${(props) => props.theme.secondaryFontColour};
  font-size: 0.8rem;
`;

const PostHeader = ({ post }) => {
  const { user, date, name, recipient, recipientName } = post;

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <img className="small round thumbnail" src={user.profilePic} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {recipient !== user._id ? (
          <h3 style={{ fontSize: "1.1em" }}>
            <Link className="bold" to={`/user/${user._id}`}>
              {name}
            </Link>{" "}
            posted on{" "}
            <Link className="bold" to={`/user/${recipient}`}>
              {recipientName}
            </Link>
            's wall
          </h3>
        ) : (
          <Link className="bold" to={`/user/${user._id}`}>
            <h3 style={{ fontSize: "1.1em" }}>{name}</h3>
          </Link>
        )}
        <TimeStamp title={format(parseISO(date), "PPPppp")}>
          {formatDistanceToNow(parseISO(date), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </TimeStamp>
      </div>
    </div>
  );
};

export default PostHeader;
