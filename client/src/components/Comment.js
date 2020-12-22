import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { AlertContext } from "../contexts/AlertContext";

const CommentContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 12px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
`;

const Comment = ({ comment, setComments, post }) => {
  const { state } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };
      const res = await axios.delete(
        `/api/posts/${post._id}/comments/${comment._id}`,
        config
      );

      setComments(res.data);
      setAlerts([{ text: "Comment deleted", type: "success" }]);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    }
    setTimeout(() => setAlerts([]), 5000);
  };

  return (
    <CommentContainer>
      <div>
        <h4 style={{ fontWeight: "800" }}>{comment.name}</h4>
        <div>{comment.text}</div>
      </div>
      {comment.user === state.userID && (
        <i
          style={{ alignSelf: "flex-start" }}
          onClick={handleDelete}
          className="fas fa-trash-alt"
        ></i>
      )}
    </CommentContainer>
  );
};

export default Comment;
