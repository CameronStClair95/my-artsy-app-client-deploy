import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

function PostDetailsPage() {
  const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [post_image, setPost_image] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/${postId}`)
      .then(response => {
        console.log(response.data);
        setPost(response.data.post);
        setContent(response.data.post.content);
        setPlace(response.data.post.place);
        setPost_image(response.data.post.post_image);
      })
      .catch(error => console.log(error));
  }, [postId]);

  return (
    <div>
      {post ? (
        <div>
          <h2> Posts:</h2>
          <div>
            <PostCard
              key={post._id}
              content={content}
              place={place}
              post_image={post_image}
              postId={post._id}
            />
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetailsPage;
