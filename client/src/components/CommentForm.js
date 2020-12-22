import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, TextInput } from "./Utils";
import { AuthContext } from "../contexts/AuthContext";
import { AlertContext } from "../contexts/AlertContext";

const CommentBox = styled(TextInput)`
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-left: 12px;
  background-color: #f3f3f3;
  border: none;
`;

const Comments = ({ post, setComments }) => {
  const { state } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);
  const [newComment, setNewComment] = useState({ text: "" });

  const handleChange = (e) => {
    setNewComment({ text: e.target.value });
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

      const body = JSON.stringify(newComment);

      const res = await axios.post(
        `/api/posts/${post._id}/comment`,
        body,
        config
      );

      setComments(res.data);
      setAlerts([{ text: "Comment posted!", type: "success" }]);
      setNewComment({ text: "" });
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    }
    setTimeout(() => setAlerts([]), 5000);
  };

  return (
    <div style={{ marginTop: "8px" }}>
      <form style={{ display: "flex" }} onSubmit={(e) => handleSubmit(e)}>
        <CommentBox
          name="text"
          placeholder="Post a comment"
          value={newComment.text}
          onChange={(e) => handleChange(e)}
        />
        <Button>Post</Button>
      </form>
    </div>
  );
};

export default Comments;
