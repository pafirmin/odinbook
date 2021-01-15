import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Notification, DropDown } from "../utils/Utils";
import NotificationListItem from "./NotificationListItem";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const { authState } = useContext(AuthContext);

  const handleRecieveNotification = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  };

  useEffect(() => {
    const { socket } = authState;
    socket.on("recieveNotification", handleRecieveNotification);

    return () => socket.off("recieveNotification", handleRecieveNotification);
  }, [authState]);

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
      const res = await axios.get(`/api/notifications`);

      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markNotificationsAsSeen = async () => {
    try {
      const res = await axios.put("/api/notifications", {});

      setTimeout(() => setNotificationCount(res.data), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDropDown = () => {
    if (!showDropDown) markNotificationsAsSeen();

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
        <h4>Notifications</h4>
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
            You have no notifications
          </div>
        )}
      </DropDown>
    </div>
  );
};

export default Notifications;
