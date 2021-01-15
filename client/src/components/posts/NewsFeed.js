import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import NewPost from "./NewPost";
import PostList from "./PostList";

const NewsFeed = () => {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    document.title = "Odinbook - Newsfeed";
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await axios.get("/api/posts/feed");

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <NewPost setPosts={setPosts} />
      <PostList posts={posts} />
    </div>
  );
};

export default NewsFeed;
