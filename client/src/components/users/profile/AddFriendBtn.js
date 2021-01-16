import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import useFriendshipStatus from "../../../hooks/useFriendshipStatus";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../utils/Utils";
import { sendFriendRequest } from "../../../socket/Socket";
import { Link } from "react-router-dom";

const ProfileBtn = styled(Button)`
  font-size: 0.8em;
  padding: 2px 8px;
`;

const AddFriendBtn = ({ user }) => {
  const { authState } = useContext(AuthContext);
  const { friendshipStatus, setFriendshipStatus } = useFriendshipStatus(
    authState.userID,
    user
  );

  const addFriend = async () => {
    try {
      const res = await axios.post(`/api/requests/${user._id}`, {});

      sendFriendRequest(res.data);
      setFriendshipStatus("isPending");
    } catch (err) {
      console.error(err);
    }
  };

  const getButton = () => {
    switch (friendshipStatus) {
      case "isUser":
        return <Link to="/editprofile">Edit profile</Link>;
      case "isFriend":
        return (
          <ProfileBtn variant="success">
            <i className="fas fa-check" /> Friends
          </ProfileBtn>
        );
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
  return getButton();
};

export default AddFriendBtn;
