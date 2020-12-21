import React, { useContext, useReducer } from "react";
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

const LikesReducer = (state, action) => {
  switch (action.type) {
    case "like":
      return { likes: state.likes + 1 };
    case "unlike":
      return { likes: state.likes - 1 };
    default:
      throw new Error();
  }
};

const Post = ({ post }) => {
  const initialState = {
    likes: post.likes.length,
  };
  const [state, dispatch] = useReducer(LikesReducer, initialState);
  const auth = useContext(AuthContext);

  const handleLike = async () => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${auth.state.token}`,
        },
      };
      const res = await axios.post(`/api/posts/${post._id}/like`, {}, config);

      const action = res.data.status === "liked" ? "like" : "unlike";

      dispatch({
        type: action,
      });
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
        <span>{state.likes} likes</span>
      </div>
      <div>
        <button>Comment</button>
        <button onClick={handleLike}>Like</button>
      </div>
    </PostContainer>
  );
};

export default Post;
