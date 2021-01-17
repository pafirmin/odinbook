import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FriendCard from "./FriendCard";

const ProfileSectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileFriends = ({ user, friends }) => {
  return (
    <Fragment>
      <ProfileSectionHeader>
        <h3 className="bold">Friends ({user.friends.length})</h3>
        <span>
          <Link to={`/users/${user._id}/friends`}>View all</Link>
        </span>
      </ProfileSectionHeader>
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
    </Fragment>
  );
};

export default ProfileFriends;
