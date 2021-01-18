import React, { Fragment, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FriendCard from "./FriendCard";
import { sampleSize } from "lodash";

const ProfileSectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileFriends = ({ user, friends, isMobile }) => {
  const sampledFriends = useCallback(sampleSize(friends, isMobile ? 6 : 9));

  return (
    <Fragment>
      <ProfileSectionHeader>
        <h3 className="bold">Friends ({friends.length})</h3>
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
        }}
      >
        {sampledFriends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProfileFriends;
