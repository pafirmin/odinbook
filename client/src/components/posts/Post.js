import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Comments from "../comments/CommentSection";
import { sendNotification } from "../../socket/Socket";

const PostContainer = styled.div`
  box-shadow: 2px 2px 8px #7d7d7d;
  margin: 16px auto;
  width: 90%;
  padding: 0.8rem;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

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
  color: ${(props) => (props.isLiked ? "#2d9ee9" : "#6b6b6b")};

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

const ProfilePic = styled.div`
  height: 40px;
  width: 40px;
  background-image: url("${({ url }) => url}");
  background-size: 100%;
  border-radius: 50%;
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
    <PostContainer>
      <div style={{ display: "flex", gap: "8px" }}>
        <ProfilePic url={post.profilePic} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/user/${post.user._id}`}>
            {post.recipient !== post.user._id ? (
              <h3 style={{ fontSize: "1.2em" }}>
                {post.name} posted on {post.recipientName}'s wall
              </h3>
            ) : (
              <h3 style={{ fontSize: "1.2em" }}>{post.name}</h3>
            )}
          </Link>
          <time style={{ fontSize: "0.8em", color: "#626262" }}>
            {moment(post.date).fromNow()}
          </time>
        </div>
      </div>
      <div style={{ margin: ".8rem 0" }}>{post.text}</div>
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
      <Comments comments={comments} setComments={setComments} post={post} />
    </PostContainer>
  );
};

export default Post;
