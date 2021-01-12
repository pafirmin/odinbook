import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserCard from "./UserCard";

const Friends = () => {
  const { state } = useContext(AuthContext);
  const { userID } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      document.title = `Odinbook - ${user.firstName}'s friends`;
    }
  });

  const fetchUser = async () => {
    const config = {
      headers: {
        Authorization: `bearer ${state.token}`,
      },
    };

    const res = await axios.get(`/api/users/${userID}`, config);

    setUser(res.data);
  };

  return (
    <div>
      {user && <h2>{user.fullName}'s friends</h2>}
      {user && user.friends.map((friend) => <UserCard user={friend.user} />)}
    </div>
  );
};

export default Friends;
