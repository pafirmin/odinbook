import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { sampleSize } from "lodash";
import { Link } from "react-router-dom";
import AddFriendBtn from "./AddFriendBtn";
import FriendCard from "./FriendCard";

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
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { location, bio, occupation } = user.profile;

  useEffect(() => {
    if (!isMobile) {
      const profileHeight = document.getElementById("profile").scrollHeight;
      const vh = window.innerHeight;
      const stickyTop = vh - profileHeight;

      document.getElementById("profile").style.top = `${stickyTop}px`;
    }
  });

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    setFriends(sampleSize(user.friends, isMobile ? 6 : 9));
  }, [user]);

  return (
    <div>
      <div
        id="profile"
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "sticky",
        }}
      >
        <ProfileSection>
          <ProfilePic src={user.profilePic} />
          <ProfileHeader>
            <div>
              <h2 className="bold">{user.fullName}</h2>
              <p>{location}</p>
            </div>
            <AddFriendBtn user={user} />
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
