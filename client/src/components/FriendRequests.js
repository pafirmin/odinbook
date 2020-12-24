import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";

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
`;

const FriendRequest = () => {
  const [requests, setRequests] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
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
    fetchRequests();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <i style={{ fontSize: "1.2em" }} className="fas fa-user-friends"></i>
      {requests.length && <Notification>{requests.length}</Notification>}
      <div style={{ bottom: "0" }}>
        {requests.map((request) => (
          <p>{request.user.fullName}</p>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
