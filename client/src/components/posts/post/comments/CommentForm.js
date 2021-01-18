import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, TextInput } from "../../../utils/Utils";
import { AuthContext } from "../../../../contexts/AuthContext";
import { AlertContext } from "../../../../contexts/AlertContext";
import { sendNotification } from "../../../../socket/Socket";

const CommentBox = styled(TextInput)`
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-left: 12px;
`;

const Comments = ({ post, setComments }) => {
  const { authState } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);
  const [newComment, setNewComment] = useState({ text: "" });

  const handleChange = (e) => {
    setNewComment({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify(newComment);

      const res = await axios.post(`/api/posts/${post._id}/comment`, body);

      setComments(res.data);
      setAlerts([{ text: "Comment posted!", type: "success" }]);
      setNewComment({ text: "" });

      sendNotification({
        sender: authState.userID,
        recipient: post.user._id,
        post: post._id,
        type: "comment",
      });
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
          autoComplete="off"
          id={`comment-box-${post._id}`}
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
