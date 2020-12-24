import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import PostList from "../posts/PostList";

const UserPage = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async (req, res) => {
      try {
        const res = await axios.get(`/api/users/${userID}`);

        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async (req, res) => {
      try {
        const res = await axios.get(`/api/posts/user/${userID}/wall`);

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 8fr" }}>
        {user && (
          <UserProfile profile={user.profile} userName={user.fullName} />
        )}
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default UserPage;
