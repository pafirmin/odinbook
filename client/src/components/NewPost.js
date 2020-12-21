import React, { useContext, useState } from "react";
import axios from "axios";
import { AlertContext } from "../contexts/AlertContext";
import { AuthContext } from "../contexts/AuthContext";
import { Button, TextInput } from "./Utils";

const NewPost = ({ posts, setPosts }) => {
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          type="text"
          name="text"
          value={newPost.text}
          onChange={(e) => handleChange(e)}
        />
        <Button>Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
