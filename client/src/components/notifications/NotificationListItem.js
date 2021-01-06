import React, { useEffect, useReducer } from "react";
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
  const { sender, post, type, date, seen } = notification;
  const initialState = { message: null };
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  useEffect(() => {
    dispatch({ type });
  }, []);

  return (
    <li>
      <Link to={`/posts/${post}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            padding: "6px 0",
            backgroundColor: seen ? "#fff" : "#c3c3c3",
          }}
        >
          {sender.fullName + state.message}
          <time>
            {formatDistanceToNow(parseISO(date), {
              includeSeconds: true,
              addSuffix: true,
            })}
          </time>
        </div>
      </Link>
    </li>
  );
};

export default NotificationListItem;
