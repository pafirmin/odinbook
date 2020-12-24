import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

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

const Comment = ({ comment, handleDelete, commentShow }) => {
  const { state } = useContext(AuthContext);

  return (
    <CommentContainer commentShow={commentShow}>
      <div>
        <h4 style={{ fontWeight: "800" }}>{comment.name}</h4>
        <div>{comment.text}</div>
      </div>
      {comment.user === state.userID && (
        <DeleteBtn onClick={() => handleDelete(comment._id)}>
          <i className="fas fa-trash-alt"></i>
        </DeleteBtn>
      )}
    </CommentContainer>
  );
};

export default Comment;
