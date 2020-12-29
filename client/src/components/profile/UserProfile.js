import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../Utils";
import { sendFriendRequest } from "../../socket/Socket";
import FriendCard from "./FriendCard";

const ProfileBtn = styled(Button)`
  font-size: 0.8em;
  border-radius: 20px;
`;

const ProfileSection = styled.section`
  padding: 0.8rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 8px #7d7d7d;
`;

const ProfileHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const ProfilePic = styled.div`
  margin: auto;
  height: auto;
  background-image: url("${({ src }) => src}");
  background-size: 100%;
  width: 70%;
  padding: 8px;
  box-shadow: 2px 2px 8px #7d7d7d;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
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

  console.log(user.friends);

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
    <div
      style={{
        marginTop: "16px",
        position: "sticky",
        top: "86px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxHeight: "80vh",
      }}
    >
      <ProfileSection>
        <ProfilePic src={user.profilePic} />
        <ProfileHeader>
          <div>
            <h2>{user.fullName}</h2>
            <p>{location}</p>
          </div>
          {getButton()}
        </ProfileHeader>
        <div>
          <div>
            <h4>Occupation</h4>
            <p>{occupation}</p>
          </div>
          <div>
            <h4>Bio</h4>
            <p>{bio}</p>
          </div>
        </div>
      </ProfileSection>
      <ProfileSection>
        <ProfileHeader>
          <h2>{user.firstName}'s friends</h2>
          <span>View all</span>
        </ProfileHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          {user.friends.map((friend) => (
            <FriendCard friend={friend} />
          ))}
        </div>
      </ProfileSection>
    </div>
  );
};

export default Profile;
