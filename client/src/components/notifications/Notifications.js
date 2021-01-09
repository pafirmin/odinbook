import React, { useContext, useEffect, useState } from "react";
import {
  disconnectFromSocket,
  listenForNotifications,
} from "../../socket/Socket";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Notification, DropDown } from "../utils/Utils";
import NotificationListItem from "./NotificationListItem";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const { state } = useContext(AuthContext);

  useEffect(() => {
    listenForNotifications(fetchNotifications);

    return () => disconnectFromSocket();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    setNotificationCount(
      notifications.reduce(
        (count, notification) => (notification.seen ? count : count + 1),
        0
      )
    );
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.get(`/api/notifications`, config);

      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markNotificationsAsSeen = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.put("/api/notifications", {}, config);

      setTimeout(() => setNotificationCount(res.data), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDropDown = () => {
    !showDropDown && markNotificationsAsSeen();

    setShowDropdown(!showDropDown);
  };

  return (
    <div style={{ position: "relative" }}>
      <i
        className="fas fa-bell"
        style={{ fontSize: "1.2em", cursor: "pointer" }}
        onClick={toggleDropDown}
      ></i>
      {notificationCount > 0 && (
        <Notification>{notificationCount}</Notification>
      )}
      <DropDown show={showDropDown}>
        <span>Notifications</span>
        <ul>
          {notifications.map((notification) => (
            <NotificationListItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </ul>
        {!notifications.length && (
          <div
            style={{
              color: "#9d9d9d",
              marginTop: "3em",
            }}
          >
            You have no pending friend requests
          </div>
        )}
      </DropDown>
    </div>
  );
};

export default Notifications;
