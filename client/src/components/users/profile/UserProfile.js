import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { sampleSize } from "lodash";
import { Link } from "react-router-dom";
import AddFriendBtn from "./AddFriendBtn";
import FriendCard from "./FriendCard";
import { Button } from "../../utils/Utils";

const ProfileSection = styled.section`
  padding: 0.8rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 2px #9d9d9d;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

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
  height: auto;
  background-image: url("${({ src }) => src}");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  padding: 8px;
  box-shadow: 0px 1px 2px #9d9d9d;
  border-radius: 50%;
  align-self: center;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Profile = ({ user }) => {
  const { location, bio, occupation } = user.profile;
  const [friends, setFriends] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const profileRef = useRef(null);

  const filteredFriends = useCallback(() => {
    return user.friends.filter((friend) => friend.status === "accepted");
  }, [user, friends]);

  useEffect(() => {
    setFriends(sampleSize(filteredFriends(), isMobile ? 6 : 9));
  }, [user, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      const profileHeight = profileRef.current.scrollHeight;
      const vh = window.innerHeight;
      const stickyTop = vh - profileHeight;

      profileRef.current.style.top = `${stickyTop}px`;
    }
  }, [user, friends, isMobile]);

  return (
    <div>
      <div
        ref={profileRef}
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "sticky",
        }}
      >
        <ProfilePic src={user.profilePic} />
        <h2 className="bold" style={{ textAlign: "center" }}>
          {user.fullName}
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px",
            width: "70%",
            alignSelf: "center",
          }}
        >
          <AddFriendBtn user={user} />
          <Button
            style={{
              padding: "2px 8px",
              fontSize: ".8rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="fas fa-envelope" /> Message
          </Button>
        </div>
        <ProfileSection>
          <div>
            <h4>Location</h4>
            <p>{location}</p>
          </div>

          <div>
            <h4>Occupation</h4>
            <p>{occupation}</p>
          </div>
          <div>
            <h4>Bio</h4>
            <p>{bio}</p>
          </div>
        </ProfileSection>
        <ProfileSection>
          <ProfileHeader>
            <h2 className="bold">Friends</h2>
            <span>
              <Link to={`/users/${user._id}/friends`}>View all</Link>
            </span>
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
        'Odinbook', created by Paul Firmin, 2021
      </div>
    </div>
  );
};

export default Profile;
