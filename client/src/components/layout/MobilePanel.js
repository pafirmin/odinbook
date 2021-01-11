import React from "react";
import FriendRequests from "../notifications/FriendRequests";
import Notifications from "../notifications/Notifications";
import MobileMenu from "./MobileMenu";

const MobileHeader = () => {
  return (
    <div style={{ display: "flex", gap: ".8em", alignItems: "center" }}>
      <Notifications />
      <FriendRequests />
      <MobileMenu />
    </div>
  );
};

export default MobileHeader;
