import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../Utils";
import { sendFriendRequest } from "../../socket/Socket";

const ProfileBtn = styled(Button)`
  font-size: 0.8em;
  border-radius: 20px;
`;

const ProfileWrapper = styled.div`
  margin-top: 16px;
  padding: 0.8rem;
  position: sticky;
  top: 86px;
  height: 50vh;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 8px #7d7d7d;
`;

const ProfileHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePic = styled.img`
  margin: auto;
  height: auto;
  width: 70%;
  padding: 8px;
  box-shadow: 2px 2px 8px #7d7d7d;
`;

const Profile = ({ user }) => {
  const [requestSent, setRequestSent] = useState(false);
  const { state } = useContext(AuthContext);
  const { location, bio, occupation } = user.profile;

  const isCurrentUserProfile = state.userID === user._id;
  const userIsFriend = user.friends.some(
    (friend) => friend.user === state.userID && friend.status === "accepted"
  );
  const requestIsPending = user.friends.some(
    (friend) => friend.user === state.userID && friend.status === "recieved"
  );

  useEffect(() => {
    if (requestIsPending) setRequestSent(true);
  }, [requestIsPending]);

  const addFriend = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.post(`/api/requests/${user._id}`, {}, config);

      sendFriendRequest(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getButton = () => {
    if (userIsFriend) {
      return <ProfileBtn variant="success">Friends</ProfileBtn>;
    } else if (isCurrentUserProfile) {
      return <ProfileBtn>Edit profile</ProfileBtn>;
    } else if (requestSent) {
      return <ProfileBtn>Request sent!</ProfileBtn>;
    } else {
      return (
        <ProfileBtn onClick={addFriend}>
          {" "}
          <i className="fas fa-user-friends" /> Add as friend
        </ProfileBtn>
      );
    }
  };

  return (
    <ProfileWrapper>
      <ProfilePic src={user.profilePic} />
      <ProfileHeader>
        <h2>{user.fullName}</h2>
        {getButton()}
      </ProfileHeader>
      <ul>
        <li>{location}</li>
        <li>{bio}</li>
        <li>{occupation}</li>
      </ul>
    </ProfileWrapper>
  );
};

export default Profile;
