import React from "react";

const UserResult = ({ user }) => {
  return (
    <div style={{ display: "flex" }}>
      <img className="thumbnail" src={user.profilePic} />
      <div>
        <h2>{user.fullName}</h2>
        <span>{user.profile.location}</span>
      </div>
    </div>
  );
};

export default UserResult;
