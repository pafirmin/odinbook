import React, { Fragment, useContext, useRef, useState } from "react";
import useIsLiked from "../../../hooks/useIsLiked";
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
  color: ${(props) => props.theme.mainColour};
  padding-right: 0.5rem;
`;

const LikeThumb = styled(SocialIcon)`
  color: ${(props) => (props.isLiked ? "#2d9ee9" : props.theme.mainColour)};
`;

const SocialBtn = styled.button`
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  width: 50%;
  border-radius: 20px;
  padding: 0.2rem 0;

  &:hover {
    background-color: ${(props) => props.theme.secondaryBg};
  }
  &:hover > .fa-thumbs-up {
    color: #2d9ee9;
  }
`;

const PostInteraction = ({ post }) => {
  const { authState } = useContext(AuthContext);
  const { comments } = post;
  const [likes, setLikes] = useState(post.likes);
  const isLiked = useIsLiked(likes, authState.userID);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/posts/${post._id}/like`, {});

      if (!isLiked)
        sendNotification({
          sender: authState.userID,
          recipient: post.user._id,
          post: post._id,
          type: "like",
        });

      setLikes(res.data);
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
          <span>{isLiked ? "You liked this" : "Like"}</span>
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
