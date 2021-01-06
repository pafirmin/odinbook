import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import PostList from "../posts/PostList";
import NewPost from "../posts/NewPost";
import { LoadingContext } from "../../contexts/LoadingContext";

const UserPage = () => {
  const { userID } = useParams();
  const { setLoading } = useContext(LoadingContext);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/users/${userID}`);

        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userID]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${userID}/wall`);

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [userID]);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "24px" }}
    >
      {user && <UserProfile user={user} />}
      <div>
        <NewPost setPosts={setPosts} userID={userID} />
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default UserPage;
