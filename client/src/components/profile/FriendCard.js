import React from "react";
import { Link } from "react-router-dom";
const FriendCard = ({ friend }) => {
  return (
    <div style={{ width: "30%", textAlign: "center" }}>
      <Link to={`/user/${friend.user._id}`}>
        <img className="large thumbnail" src={friend.user.profilePic} />
        <figcaption style={{ fontSize: ".85rem", fontWeight: "900" }}>
          {friend.user.fullName}
        </figcaption>
      </Link>
    </div>
  );
};

export default FriendCard;
