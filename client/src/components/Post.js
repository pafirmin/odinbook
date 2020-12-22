import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Comments from "./CommentSection";

const PostContainer = styled.div`
  box-shadow: 2px 2px 8px #7d7d7d;
  margin: 16px auto;
  width: 80%;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
`;

const SocialDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c3c3c3;
  padding: 8px 0;
`;

const SocialIcon = styled.i`
  font-size: 1.3em;
  color: #6b6b6b;
  padding-right: 0.5rem;
`;

const LikeThumb = styled(SocialIcon)`
  color: ${(props) => (props.isLiked ? "#2d9ee9" : "#6b6b6b")};
`;

const SocialBtn = styled.button`
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
`;

const Post = ({ post }) => {
  const { state } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    setIsLiked(likes.map((like) => like.user._id).includes(state.userID));
  }, []);

  const handleLike = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      };
      const res = await axios.post(`/api/posts/${post._id}/like`, {}, config);

      setLikes(res.data);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PostContainer>
      <div>
        <h3 style={{ fontSize: "1.2em" }}>{post.name}</h3>
        <time style={{ fontSize: "0.8em" }}>{moment(post.date).fromNow()}</time>
      </div>
      <div style={{ margin: "8px 0" }}>{post.text}</div>
      <SocialDiv>
        <span>{likes.length} likes</span>
        <span>{comments.length} comments</span>
      </SocialDiv>
      <SocialDiv>
        <SocialBtn onClick={handleLike}>
          <LikeThumb isLiked={isLiked} className="fas fa-thumbs-up" />
          {isLiked ? "You liked this" : "Like"}
        </SocialBtn>
        <SocialBtn>
          <SocialIcon className="far fa-comments" />
          Comment
        </SocialBtn>
      </SocialDiv>
      <Comments comments={comments} setComments={setComments} post={post} />
    </PostContainer>
  );
};

export default Post;
