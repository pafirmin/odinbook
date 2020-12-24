import React from "react";
import FriendRequests from "../FriendRequests";
import UserSearch from "../UserSearch";

const UserPanel = () => {
  return (
    <div style={{ display: "flex" }}>
      <UserSearch />
      <FriendRequests />
    </div>
  );
};

export default UserPanel;
