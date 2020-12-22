import React, { Fragment } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentSection = ({ post, comments, setComments }) => {
  return (
    <Fragment>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          setComments={setComments}
          post={post}
        />
      ))}
      <CommentForm post={post} setComments={setComments} />
    </Fragment>
  );
};

export default CommentSection;
