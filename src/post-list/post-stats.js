import React, { useEffect } from "react";
import {
  BsChatSquare,
  BsHeart,
  BsHeartFill,
  BsArrowRepeat,
  BsShare,
} from "react-icons/bs";
import "./index.css";
import { FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getPostThunk, likeUpdateThunk } from "../services/post-thunks";
import { useNavigate } from "react-router";

const PostStats = ({ post }) => {
  useEffect(() => {
    console.log("Hello" + post.upvoteCount);
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  async function handleLikeUpdate(postId, userId, isLike) {
    const newLike = {
      postId: postId,
      userId: userId,
      isLike: isLike,
    };
    await dispatch(likeUpdateThunk({ postId, userId, isLike, token }));
    await dispatch(getPostThunk(token));
  }

  return (
    <div className="tuit-stats">
      <div className="tuit-stat">
        {currentUser ? (<BsChatSquare className="tuit-stat-icon" />) :(<BsChatSquare className="tuit-stat-icon" onClick={() => {
                                                                                                                                        navigate("/login");
                                                                                                                                      }}/>)}
        <span className="tuit-stat-count">{post.retuits}</span>
      </div>
      {currentUser ? (
        <div className="tuit-stat">
          {post.upvoteByCurrentUser ? (
            <BsHeartFill
              className="tuit-stat-icon liked"
              onClick={() =>
                handleLikeUpdate(
                  post.postId,
                  currentUser.user.id,
                  !post.upvoteByCurrentUser
                )
              }
            />
          ) : (
            <BsHeart
              className="tuit-stat-icon"
              onClick={() =>
                handleLikeUpdate(
                  post.postId,
                  currentUser.user.id,
                  !post.upvoteByCurrentUser
                )
              }
            />
          )}
          <span className="tuit-stat-count">{post.upvoteCount}</span>
        </div>
      ) : (
        <div className="tuit-stat">
          <BsHeart
            className="tuit-stat-icon"
            onClick={() => {
              navigate("/login");
            }}
          />
          <span className="tuit-stat-count">{post.upvoteCount}</span>
        </div>
      )}

      <div className="tuit-stat">
        {currentUser ? (<BsArrowRepeat className="tuit-stat-icon" />) :(<BsArrowRepeat className="tuit-stat-icon" onClick={() => {
                                                                                                                                navigate("/login");
                                                                                                                              }}/>)}
        <span className="tuit-stat-count">{post.replies}</span>
      </div>
      <div className="tuit-stat">
        {currentUser ? (<FaThumbsDown className="tuit-stat-icon" />) :(<FaThumbsDown className="tuit-stat-icon" onClick={() => {
                                                                                                                                        navigate("/login");
                                                                                                                                      }}/>)}
        <span className="tuit-stat-count"> {post.dislikes}</span>
      </div>
      <div className="tuit-stat">
        {currentUser ? (<BsShare className="tuit-stat-icon" />) :(<BsShare className="tuit-stat-icon" onClick={() => {
                                                                                                                                        navigate("/login");
                                                                                                                                      }}/>)}
      </div>
    </div>
  );
};

export default PostStats;
