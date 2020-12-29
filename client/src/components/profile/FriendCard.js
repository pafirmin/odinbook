import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FriendProfilePic = styled.div`
  background-image: url("${({ img }) => img}");
  background-size: 100%;
  height: 90px;
  width: 90px;
`;

const FriendCard = ({ friend }) => {
  return (
    <Link to={`/user/${friend.user._id}`}>
      <div>
        <FriendProfilePic img={friend.user.profilePic}></FriendProfilePic>
        {friend.user.fullName}
      </div>
    </Link>
  );
};

export default FriendCard;
