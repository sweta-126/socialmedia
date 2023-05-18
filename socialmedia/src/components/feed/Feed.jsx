import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import {axiosInst} from "../../config";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axiosInst.get("/posts/profile/" + username)
        : await axiosInst.get("posts/timeline/" + user._id);
      console.log(res);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
