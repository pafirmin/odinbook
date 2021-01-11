import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

const PostPage = () => {
  const { postID } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/viewpost/${postID}`);

        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postID]);

  return <div>{post && <Post post={post} />}</div>;
};

export default PostPage;
