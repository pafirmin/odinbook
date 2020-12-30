import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import PostList from "../posts/PostList";
import NewPost from "../posts/NewPost";

const UserPage = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userID}`);

        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userID]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${userID}/wall`);

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [userID]);

  console.log(userID);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr" }}>
      {user && <UserProfile user={user} />}
      <div>
        <NewPost setPosts={setPosts} userID={userID} />
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default UserPage;
