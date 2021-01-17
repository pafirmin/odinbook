import React from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";

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
          <Link to={`/user/${user._id}`}>
            <h3 style={{ fontSize: "1.2em" }}>{name}</h3>
          </Link>
        )}
        <time
          title={format(parseISO(date), "PPPppp")}
          style={{ fontSize: "0.8em", color: "#626262" }}
        >
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
