import React from "react";

const Profile = ({ profile, userName }) => {
  return (
    <div
      style={{
        marginTop: "16px",
        padding: ".8rem",
        position: "sticky",
        top: "50px",
        height: "50vh",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px #7d7d7d",
      }}
    >
      <header>
        <h2>{userName}</h2>
      </header>
      <ul>
        <li>{profile.location}</li>
        <li>{profile.bio}</li>
        <li>{profile.occupation}</li>
      </ul>
    </div>
  );
};

export default Profile;
