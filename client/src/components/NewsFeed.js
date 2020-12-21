import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NewPost from "./NewPost";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `bearer ${state.token}`,
          },
        };
        const res = await axios.get("/api/posts/feed", config);

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <NewPost posts={posts} setPosts={setPosts} />
      {posts.map((post) => (
        <p key={post._id}>{post.text}</p>
      ))}
    </div>
  );
};

export default NewsFeed;
