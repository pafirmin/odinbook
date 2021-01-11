import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Comments from "../comments/CommentSection";
import { sendNotification } from "../../socket/Socket";

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

const Post = ({ post }) => {
  const { user, date, name, recipient, recipientName, text, profilePic } = post;
  const { state } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes.map((like) => like.user._id).includes(state.userID));
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
        <img className="small round thumbnail" src={profilePic} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/user/${user._id}`}>
            {recipient !== user._id ? (
              <h3 style={{ fontSize: "1.1em" }}>
                <span className="bold">{name}</span> posted on{" "}
                <span className="bold">{recipientName}</span>'s wall
              </h3>
            ) : (
              <h3 style={{ fontSize: "1.2em" }}>{name}</h3>
            )}
          </Link>
          <time style={{ fontSize: "0.8em", color: "#626262" }}>
            {formatDistanceToNow(parseISO(date), {
              includeSeconds: true,
              addSuffix: true,
            })}
          </time>
        </div>
      </div>
      <div style={{ margin: ".8rem 0" }}>{text}</div>
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
