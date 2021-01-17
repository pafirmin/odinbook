import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/AuthContext";
import axios from "axios";
import useIsLiked from "../../../../hooks/useIsLiked";
import { sendNotification } from "../../../../socket/Socket";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
  display: ${(props) => (props.commentShow ? "flex" : "none")};
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 12px;
  margin: 8px 0;
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;

  &:hover {
    color: #f33434;
  }
`;

const Comment = ({ post, comment, handleDelete, commentShow }) => {
  const { authState } = useContext(AuthContext);
  const [likes, setLikes] = useState(comment.likes);
  const isLiked = useIsLiked(likes, authState.userID);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `/api/posts/${post._id}/comments/${comment._id}/like`,
        {}
      );

      if (!isLiked)
        sendNotification({
          sender: authState.userID,
          recipient: comment.user,
          post: post._id,
          type: "like",
        });

      setLikes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CommentContainer commentShow={commentShow}>
      <div>
        <h4 style={{ fontWeight: "800" }}>
          <Link to={`/user/${comment.user}`}>{comment.name}</Link>
        </h4>
        <div>{comment.text}</div>
        <i
          className="fas fa-thumbs-up"
          style={{
            color: isLiked ? "#2d9ee9" : "#6b6b6b",
            cursor: "pointer",
            marginLeft: ".4rem",
          }}
          onClick={handleLike}
        />{" "}
        <span style={{ fontSize: ".9rem" }}>{likes.length}</span>
      </div>
      {comment.user === authState.userID && (
        <DeleteBtn onClick={() => handleDelete(comment._id)}>
          <i className="fas fa-trash-alt"></i>
        </DeleteBtn>
      )}
    </CommentContainer>
  );
};

export default Comment;
