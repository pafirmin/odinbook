import React, { useState } from "react";
import styled from "styled-components";
import Comments from "./comments/CommentSection";
import PostHeader from "./PostHeader";
import PostInteraction from "./PostInteraction";

const PostContainer = styled.div`
  box-shadow: 0px 1px 2px #9d9d9d;
  margin: 16px auto;
  padding: 0.8rem;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

const Post = ({ post }) => {
  const { text } = post;
  const [comments, setComments] = useState(post.comments);

  return (
    <PostContainer>
      <PostHeader post={post} />
      <div style={{ margin: ".8rem 0" }}>{text}</div>
      <PostInteraction post={post} />
      <Comments comments={comments} setComments={setComments} post={post} />
    </PostContainer>
  );
};

export default Post;
