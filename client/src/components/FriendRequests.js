import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";
import { Button } from "./Utils";
import { Link } from "react-router-dom";
import FriendRequestListItem from "./FriendRequestListItem";

const Notification = styled.div`
  border-radius: 50%;
  background-color: #f00;
  color: #fff;
  font-size: 0.8rem;
  width: 1.6em;
  height: 1.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-left: -3px;
  box-shadow: 2px 1px 3px #616161;
  position: absolute;
  top: -0.1em;
  right: -1.2em;
`;

const DropDown = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  color: #434343;
  position: absolute;
  width: 300px;
  height: 200px;
  background-color: #fff;
  box-shadow: 2px 2px 8px #7d7d7d;
  padding: 6px;
`;

const FriendRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.get(`/api/requests`, config);

      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDropDown = () => {
    !showDropDown && fetchRequests();
    setShowDropdown(!showDropDown);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div>
        <i
          style={{ fontSize: "1.2em", cursor: "pointer" }}
          className="fas fa-user-friends"
          onClick={toggleDropDown}
        />
        {requests.length > 0 && <Notification>{requests.length}</Notification>}
        <DropDown show={showDropDown}>
          <ul>
            {requests.map((request) => (
              <FriendRequestListItem
                user={request.user}
                requests={requests}
                setRequests={setRequests}
                requestID={request._id}
              />
            ))}
          </ul>
          {!requests.length && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              No pending friend requests
            </div>
          )}
        </DropDown>
      </div>
    </div>
  );
};

export default FriendRequest;
