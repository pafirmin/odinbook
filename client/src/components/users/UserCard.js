import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user._id}`}>
      <div
        className="card"
        style={{ display: "flex", gap: ".5rem", margin: "8px 0" }}
      >
        <img className="round thumbnail" src={user.profilePic} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 className="bold">{user.fullName}</h2>
          <span>{user.profile.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
