import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserResult = ({ user }) => {
  return (
    <Link to={`/user/${user._id}`}>
      <div style={{ display: "flex" }}>
        <img className="thumbnail" src={user.profilePic} />
        <div>
          <h2>{user.fullName}</h2>
          <span>{user.profile.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default UserResult;
