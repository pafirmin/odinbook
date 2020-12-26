import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../Utils";

const AddFriendBtn = styled(Button)`
  font-size: 0.8em;
  border-radius: 20px;
`;

const Profile = ({ user }) => {
  const { state } = useContext(AuthContext);
  const { location, bio, occupation } = user.profile;
  const isCurrentUserProfile = state.userID === user._id;

  const addFriend = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.post(`/api/requests/${user._id}`, {}, config);

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        marginTop: "16px",
        padding: ".8rem",
        position: "sticky",
        top: "86px",
        height: "50vh",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px #7d7d7d",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{user.fullName}</h2>
        {!isCurrentUserProfile && (
          <AddFriendBtn onClick={addFriend}>
            {" "}
            <i className="fas fa-user-friends" /> Add as friend
          </AddFriendBtn>
        )}
      </header>
      <ul>
        <li>{location}</li>
        <li>{bio}</li>
        <li>{occupation}</li>
      </ul>
    </div>
  );
};

export default Profile;
