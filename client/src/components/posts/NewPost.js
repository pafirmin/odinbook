import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../utils/Utils";
import { sendNotification } from "../../socket/Socket";

const PostArea = styled.textarea`
  resize: none;
  font: inherit;
  padding: 0.7rem;
  width: 100%;
  border: none;
  border-bottom: 1px solid #c6c6c6;
  margin: 0.5rem auto;
`;

const NewPostBtn = styled(Button)`
  border-radius: 20px;
  width: 100%;
  margin: auto;

  &:hover {
    background-color: #2883bf;
  }

  &.post-submit {
    width: 20%;
  }
`;

const NewPostForm = styled.form`
  text-align: center;
  background: #fff;
  margin: auto;
  margin-top: -0.7rem;
  padding: 8px;
  display: ${({ formShow }) => (formShow ? "block" : "none")};
  box-shadow: 2px 2px 8px #7d7d7d;
  border-radius: 8px;
`;

const NewPost = ({ setPosts, userID }) => {
  const [newPost, setNewPost] = useState({ text: "" });
  const [formShow, setFormShow] = useState(false);
  const { state } = useContext(AuthContext);
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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${state.token}`,
        },
      };

      const body = JSON.stringify(newPost);

      const res = userID
        ? await axios.post(`/api/posts/users/${userID}`, body, config)
        : await axios.post("/api/posts", body, config);

      setNewPost({ text: "" });
      setPosts((prevState) => [res.data, ...prevState]);
      setAlerts([{ text: "Post successful!", type: "success" }]);

      if (userID) {
        sendNotification({
          sender: state.userID,
          recipientID: userID,
          post: res.data._id,
          type: "post",
        });
      }
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    }
    setTimeout(() => setAlerts([]), 5000);
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
          placeholder="Your message here..."
          value={newPost.text}
          onChange={(e) => handleChange(e)}
        />
        <NewPostBtn className="post-submit">Post</NewPostBtn>
      </NewPostForm>
    </div>
  );
};

export default NewPost;
