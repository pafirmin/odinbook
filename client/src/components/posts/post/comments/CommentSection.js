import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AlertContext } from "../../../../contexts/AlertContext";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const ShowCommentsBtn = styled.button`
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  color: inherit;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  margin-top: 0.4rem;
  width: 200px;

  &:hover {
    background-color: ${(props) => props.theme.secondaryBg};
  }
`;

const CommentSection = ({ post, comments, setComments }) => {
  const { setAlerts } = useContext(AlertContext);
  const [commentShow, setCommentShow] = useState(false);

  const handleDelete = async (commentID) => {
    try {
      const res = await axios.delete(
        `/api/posts/${post._id}/comments/${commentID}`
      );

      setComments(res.data);
      setAlerts([{ text: "Comment deleted", type: "success" }]);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    } finally {
      setTimeout(() => setAlerts([]), 5000);
    }
  };

  const handleClick = () => {
    setCommentShow(!commentShow);
  };

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        {comments.length > 1 && (
          <ShowCommentsBtn onClick={handleClick}>
            {commentShow ? "Hide comments" : "Show more comments"}
          </ShowCommentsBtn>
        )}
      </div>
      {comments.map((comment, i) => (
        <Comment
          key={comment._id}
          post={post}
          comment={comment}
          handleDelete={handleDelete}
          commentShow={i < comments.length - 1 ? commentShow : true}
        />
      ))}
      <CommentForm post={post} setComments={setComments} />
    </Fragment>
  );
};

export default CommentSection;
