import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const PostHeader = ({ post }) => {
  const { user, date, name, recipient, recipientName, profilePic } = post;

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <img className="small round thumbnail" src={profilePic} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Link to={`/user/${user._id}`}>
          {recipient !== user._id ? (
            <h3 style={{ fontSize: "1.1em" }}>
              <span className="bold">{name}</span> posted on{" "}
              <span className="bold">{recipientName}</span>'s wall
            </h3>
          ) : (
            <h3 style={{ fontSize: "1.2em" }}>{name}</h3>
          )}
        </Link>
        <time style={{ fontSize: "0.8em", color: "#626262" }}>
          {formatDistanceToNow(parseISO(date), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </time>
      </div>
    </div>
  );
};

export default PostHeader;
