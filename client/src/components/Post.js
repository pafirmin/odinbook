import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const PostContainer = styled.div`
  box-shadow: 0px 0px 4px 1px #d2d2d2;
  margin: 16px auto;
  width: 80%;
  padding: 8px;
  border-radius: 8px;
`;

const LikeThumb = styled.i`
  color: ${(props) => (props.isLiked ? "#2d9ee9" : "#6b6b6b")};
  font-size: 1.1em;
`;

const Post = ({ post }) => {
  const { state } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

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
      <div>{post.text}</div>
      <div>
        <span>{post.comments.length} comments</span>
        <span>
          <LikeThumb isLiked={isLiked} className="fas fa-thumbs-up" />
          {likes.length}
        </span>
      </div>
      <div>
        <button>Comment</button>
        <button onClick={handleLike}>Like</button>
      </div>
    </PostContainer>
  );
};

export default Post;
