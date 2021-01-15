import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import FriendRequestListItem from "./FriendRequestListItem";
import { DropDown, Notification } from "../utils/Utils";

const FriendRequests = ({ activeDropdown, toggleDropdown }) => {
  const [requests, setRequests] = useState([]);
  const { authState } = useContext(AuthContext);

  const handleRecieveRequest = (request) => setRequests([request, ...requests]);

  useEffect(() => {
    activeDropdown === 3 && fetchRequests();
  }, [authState.user, activeDropdown]);

  useEffect(() => {
    const { socket } = authState;
    socket.on("recieveRequest", handleRecieveRequest);

    return () => socket.off("recieveRequest", handleRecieveRequest);
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/api/requests`);

      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div>
        <i
          style={{ fontSize: "1.2em", cursor: "pointer" }}
          className="fas fa-user-friends"
          onClick={toggleDropdown}
        />
        {requests.length > 0 && <Notification>{requests.length}</Notification>}
        {activeDropdown === 3 && (
          <DropDown>
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
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
