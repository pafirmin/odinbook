import axios from "axios";
import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NewPost from "./NewPost";
import PostList from "./PostList";
import { Button } from "./Utils";

const NewPostBtn = styled(Button)`
  border-radius: 20px;
  width: 70%;
  margin: auto;

  &:hover {
    background-color: #2883bf;
  }
`;

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [formShow, setFormShow] = useState(false);
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

  const toggleForm = () => {
    setFormShow(!formShow);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <NewPostBtn onClick={toggleForm}>Post something...</NewPostBtn>
      </div>
      <NewPost posts={posts} setPosts={setPosts} formShow={formShow} />
      <PostList posts={posts} />
    </div>
  );
};

export default NewsFeed;
