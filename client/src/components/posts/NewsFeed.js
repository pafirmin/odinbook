import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import NewPost from "./NewPost";
import PostList from "./PostList";

const NewsFeed = () => {
  const { authState } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    document.title = "Odinbook - Newsfeed";
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `bearer ${authState.token}`,
          },
        };
        const res = await axios.get("/api/posts/feed", config);

        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
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
