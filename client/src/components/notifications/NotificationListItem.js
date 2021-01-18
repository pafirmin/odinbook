import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import styled from "styled-components";

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColour};
  border-radius: 6px;
  padding: 0.4rem;
  gap: 0.4rem;
  margin: 0.2rem 0;
  background-color: ${(props) => (props.seen ? props.theme.cardBg : "#e6efff")};
  color: ${(props) => (props.seen ? props.theme.mainFontColour : "#1c1c1c")};
`;

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "like":
      return { message: ` liked your post` };
    case "commentLike":
      return { message: ` liked your comment` };
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
        <NotificationContainer seen={seen}>
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
        </NotificationContainer>
      </Link>
    </li>
  );
};

export default NotificationListItem;
