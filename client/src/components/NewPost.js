import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AlertContext } from "../contexts/AlertContext";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "./Utils";

const PostArea = styled.textarea`
  resize: none;
  font: inherit;
  padding: 0.7rem;
  width: 100%;
  border: none;
  border-bottom: 1px solid #c6c6c6;
  margin: 0.5rem auto;
`;

const NewPost = ({ posts, setPosts, formShow }) => {
  const [newPost, setNewPost] = useState({ text: "" });
  const { state } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);

  const handleChange = (e) => {
    setNewPost({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${state.token}`,
        },
      };

      const body = JSON.stringify(newPost);

      const res = await axios.post("/api/posts", body, config);

      setNewPost({ text: "" });
      setPosts([res.data, ...posts]);
      setAlerts([{ text: "Post successful!", type: "success" }]);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    }
    setTimeout(() => setAlerts([]), 5000);
  };

  return (
    <div>
      <form
        style={{
          width: "80%",
          textAlign: "center",
          background: "#fff",
          margin: "auto",
          marginTop: "-.7rem",
          padding: "8px",
          display: formShow ? "block" : "none",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <PostArea
          name="text"
          placeholder="Your message here..."
          value={newPost.text}
          onChange={(e) => handleChange(e)}
        />
        <Button>Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
