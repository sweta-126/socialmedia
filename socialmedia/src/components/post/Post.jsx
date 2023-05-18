import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import {axiosInst} from "../../config";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInst.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axiosInst.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (e) {
      console.log(e);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    try{
      await axiosInst.delete(`/posts/${post._id}`, { data : { userId: currentUser._id }});
      window.location.reload();
    }catch(e){
      console.log(e);
      toast("You can delete only your post");
    }
  }

  return (
    <div className="post">
      <div className="wrapper">
        <div className="top">
          <div className="topLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="userName">{user.username}</span>
            <span className="postTime">{format(post.createdAt)}</span>
          </div>
          <div className="topRight" onClick={deleteHandler}>
            Delete
          </div>
        </div>
        <div className="center">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="bottom">
          <div className="bottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postlikeCounter">{like} people like it</span>
          </div>
          <div className="bottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
