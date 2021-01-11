import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import useFriendshipStatus from "../../hooks/useFriendshipStatus";
import { sampleSize } from "lodash";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../utils/Utils";
import { sendFriendRequest } from "../../socket/Socket";
import FriendCard from "./FriendCard";
import { Link } from "react-router-dom";

const ProfileBtn = styled(Button)`
  font-size: 0.8em;
  border-radius: 20px;
  padding: 0 8px;
`;

const ProfileSection = styled.section`
  padding: 0.8rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 2px #9d9d9d;

  & a:hover {
    text-decoration: underline;
  }
`;

const ProfileHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePic = styled.div`
  margin: auto auto 16px auto;
  height: auto;
  background-image: url("${({ src }) => src}");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
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
  const { state } = useContext(AuthContext);
  const { location, bio, occupation } = user.profile;
  const [friendshipStatus, setFriendshipStatus] = useFriendshipStatus(
    state.userID,
    user
  );

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    setFriends(sampleSize(user.friends, 6));
  }, [user]);

  const addFriend = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.post(`/api/requests/${user._id}`, {}, config);

      sendFriendRequest(res.data);
      setFriendshipStatus("pending");
    } catch (err) {
      console.error(err);
    }
  };

  const getButton = () => {
    switch (friendshipStatus) {
      case "isUser":
        return (
          <Link
            to={{
              pathname: "/editprofile",
              state: { profile: user.profile },
            }}
          >
            Edit profile
          </Link>
        );
      case "isFriend":
        return <ProfileBtn variant="success">Friends</ProfileBtn>;
      case "isPending":
        return <ProfileBtn>Request sent!</ProfileBtn>;
      default:
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
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <ProfileSection>
        <ProfilePic src={user.profilePic} />
        <ProfileHeader>
          <div>
            <h2 className="bold">{user.fullName}</h2>
            <p>{location}</p>
          </div>
          {getButton()}
        </ProfileHeader>
        <div style={{ marginTop: ".8rem" }}>
          <div>
            <h4>Occupation</h4>
            <p>{occupation}</p>
          </div>
          <div style={{ marginTop: ".8rem" }}>
            <h4>Bio</h4>
            <p>{bio}</p>
          </div>
        </div>
      </ProfileSection>
      <ProfileSection style={{ position: "", top: "" }}>
        <ProfileHeader>
          <h2 className="bold">Friends</h2>
          <span>View all</span>
        </ProfileHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: "10px",
            gap: "8px",
          }}
        >
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      </ProfileSection>
    </div>
  );
};

export default Profile;
