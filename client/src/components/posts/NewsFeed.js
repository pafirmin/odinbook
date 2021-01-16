import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import NewPost from "./NewPost";
import PostList from "./PostList";
import { debounce } from "lodash";

const NewsFeed = () => {
  const { setLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    document.title = "Odinbook - Newsfeed";
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 500));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts/feed?skip=${skip}`);

        setPosts((prev) => [...prev, ...res.data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [skip]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      setSkip((prev) => prev + 10);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <NewPost setPosts={setPosts} />
      <PostList posts={posts} />
    </div>
  );
};

export default NewsFeed;
