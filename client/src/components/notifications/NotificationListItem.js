import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "like":
      return { message: ` liked your post` };
    case "comment":
      return { message: ` commented on your post` };
    case "post":
      return { message: ` posted on your wall` };
    default:
      return state;
  }
};

const NotificationListItem = ({ notification }) => {
  const { sender, post, type, date } = notification;
  const initialState = { message: null };
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const [seen, setSeen] = useState(notification.seen);

  useEffect(() => {
    dispatch({ type });
  }, []);

  return (
    <li onClick={() => setSeen(true)}>
      <Link to={`/posts/${post}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #d9d9d9",
            borderRadius: "6px",
            padding: ".4rem",
            gap: ".4rem",
            margin: ".2rem 0",
            backgroundColor: seen ? "#fff" : "#e6efff",
          }}
        >
          <img className="small round thumbnail" src={sender.profilePic} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <span>
              <span className="bold">{sender.fullName}</span> {state.message}
            </span>
            <time style={{ color: "#7a7a7a" }}>
              {formatDistanceToNow(parseISO(date), {
                includeSeconds: true,
                addSuffix: true,
              })}
            </time>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NotificationListItem;
