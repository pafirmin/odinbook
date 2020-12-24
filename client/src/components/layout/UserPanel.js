import React from "react";
import FriendRequests from "../FriendRequests";
import UserSearch from "../UserSearch";

const UserPanel = () => {
  return (
    <nav style={{ display: "flex", gap: "1.5rem" }}>
      <UserSearch />
      <FriendRequests />
    </nav>
  );
};

export default UserPanel;
