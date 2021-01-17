import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, PostArea } from "../utils/Utils";
import { sendNotification } from "../../socket/Socket";

const NewPostBtn = styled(Button)`
  border-radius: 20px;
  width: 100%;
  margin: auto;
  box-shadow: 0px 1px 2px #9d9d9d;

  &:hover {
    background-color: #2883bf;
  }

  &.post-submit {
    width: 20%;
  }
`;

const NewPostForm = styled.form`
  text-align: center;
  margin: auto;
  margin-top: -1.1rem;
  padding: 8px;
  display: ${({ formShow }) => (formShow ? "block" : "none")};
  box-shadow: 0px 1px 2px #9d9d9d;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const NewPost = ({ setPosts, userID }) => {
  const [newPost, setNewPost] = useState({ text: "" });
  const [formShow, setFormShow] = useState(false);
  const { authState } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);

  useEffect(() => {
    setFormShow(false);
    setNewPost({ text: "" });
  }, [userID]);

  const handleChange = (e) => {
    setNewPost({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(newPost);

      const res = userID
        ? await axios.post(`/api/posts/users/${userID}`, body)
        : await axios.post("/api/posts", body);

      setNewPost({ text: "" });
      setPosts((prevState) => [res.data, ...prevState]);
      setAlerts([{ text: "Post successful!", type: "success" }]);

      if (userID) {
        sendNotification({
          sender: authState.userID,
          recipient: userID,
          post: res.data._id,
          type: "post",
        });
      }
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    } finally {
      setTimeout(() => setAlerts([]), 5000);
    }
  };

  const toggleForm = () => {
    setFormShow(!formShow);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        <NewPostBtn onClick={toggleForm}>Post something...</NewPostBtn>
      </div>
      <NewPostForm formShow={formShow} onSubmit={(e) => handleSubmit(e)}>
        <PostArea
          name="text"
          rows={3}
          placeholder="What's on your mind?"
          value={newPost.text}
          onChange={(e) => handleChange(e)}
        />
        <NewPostBtn className="post-submit">Post</NewPostBtn>
      </NewPostForm>
    </div>
  );
};

export default NewPost;
