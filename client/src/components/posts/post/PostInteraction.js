import React, { Fragment, useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/AuthContext";
import { sendNotification } from "../../../socket/Socket";

const SocialDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c6c6c6;
  padding: 0.2rem 0;
`;

const SocialIcon = styled.i`
  font-size: 1.3em;
  color: #6b6b6b;
  padding-right: 0.5rem;
`;

const LikeThumb = styled(SocialIcon)`
  color: ${({ isLiked }) => (isLiked ? "#2d9ee9" : "#6b6b6b")};

  &:hover {
    color: #2d9ee9;
  }
`;

const SocialBtn = styled.button`
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  width: 50%;
  border-radius: 20px;
  padding: 0.2rem 0;

  &: hover {
    background-color: #f5f5f5;
  }
`;

const PostInteraction = ({ post }) => {
  const { state } = useContext(AuthContext);
  const { comments } = post;
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes.map((like) => like.user).includes(state.userID));
  }, [likes]);

  const handleLike = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };

      const res = await axios.post(`/api/posts/${post._id}/like`, {}, config);

      setLikes(res.data);

      if (!isLiked)
        sendNotification({
          sender: state.userID,
          recipientID: post.user._id,
          post: post._id,
          type: "like",
        });
    } catch (err) {
      console.error(err);
    }
  };

  const focusCommentBox = () => {
    document.getElementById(`comment-box-${post._id}`).focus();
  };

  return (
    <Fragment>
      <SocialDiv>
        <span>
          {likes.length} like{likes.length !== 1 && "s"}
        </span>
        <span>
          {comments.length} comment{comments.length !== 1 && "s"}
        </span>
      </SocialDiv>
      <SocialDiv>
        <SocialBtn onClick={handleLike}>
          <LikeThumb isLiked={isLiked} className="fas fa-thumbs-up" />
          {isLiked ? "You liked this" : "Like"}
        </SocialBtn>
        <SocialBtn onClick={focusCommentBox}>
          <SocialIcon className="far fa-comments" />
          Comment
        </SocialBtn>
      </SocialDiv>
    </Fragment>
  );
};

export default PostInteraction;
