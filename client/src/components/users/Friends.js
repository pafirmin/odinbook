import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";

const Friends = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      document.title = `Odinbook - ${user.firstName}'s friends`;
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/users/${userID}`);

      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {user && <h2>{user.fullName}'s friends</h2>}
      {user &&
        user.friends.map((friend) => (
          <UserCard key={friend._id} user={friend.user} />
        ))}
    </div>
  );
};

export default Friends;
