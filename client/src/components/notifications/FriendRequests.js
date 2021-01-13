import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import FriendRequestListItem from "./FriendRequestListItem";
import { disconnectFromSocket, listenForRequests } from "../../socket/Socket";
import { DropDown, Notification } from "../utils/Utils";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetchRequests();
  }, [authState.user]);

  useEffect(() => {
    listenForRequests(setRequests);

    return () => disconnectFromSocket();
  }, []);

  const fetchRequests = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${authState.token}`,
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
          <span>Friend requests</span>
          <ul>
            {requests.map((request) => (
              <FriendRequestListItem
                key={request._id}
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
                color: "#9d9d9d",
                marginTop: "3em",
              }}
            >
              You have no pending friend requests
            </div>
          )}
        </DropDown>
      </div>
    </div>
  );
};

export default FriendRequests;
