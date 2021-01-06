import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../utils/Utils";
import { AuthContext } from "../../contexts/AuthContext";

const DropDownItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c3c3c3;
  padding: 0.1rem 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const FriendAccepted = styled(DropDownItem)`
  background: #d5ffd5;
  padding: 0.8rem 0;
`;

const FriendRequestListItem = ({ user, requests, setRequests, requestID }) => {
  const { state } = useContext(AuthContext);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async (userID) => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      await axios.post(`/api/requests/${userID}/accept`, {}, config);

      setAccepted(true);

      setTimeout(
        () =>
          setRequests(requests.filter((request) => request._id !== requestID)),
        3000
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {accepted ? (
        <FriendAccepted>
          You are now friends with {user.firstName}!
        </FriendAccepted>
      ) : (
        <DropDownItem>
          <Link to={`/user/${user._id}`}>{user.fullName}</Link>{" "}
          <Button onClick={() => handleAccept(user._id)}>Accept</Button>
        </DropDownItem>
      )}
    </div>
  );
};

export default FriendRequestListItem;
