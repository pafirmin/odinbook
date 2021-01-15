import React from "react";
import FriendRequests from "../notifications/FriendRequests";
import Messages from "../notifications/Messages";
import Notifications from "../notifications/Notifications";
import MobileMenu from "./MobileMenu";

const MobileHeader = () => {
  return (
    <div style={{ display: "flex", gap: ".8em", alignItems: "center" }}>
      <Messages />
      <Notifications />
      <FriendRequests />
      <MobileMenu />
    </div>
  );
};

export default MobileHeader;
