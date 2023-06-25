import React, { useEffect } from "react";
import PostItem from "./post-item";
import { useDispatch, useSelector } from "react-redux";
import {getPostThunk, getPostThunkWithoutToken} from "../services/post-thunks";
import "./postList.css";
import {current} from "@reduxjs/toolkit";

const PostList = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const load=async ()=>{
      if(token){
        await dispatch(getPostThunk(token));
      }else{
        await dispatch(getPostThunkWithoutToken());
      }
    }
    load();

  }, []);

  return (
    <ul className="list-group rounded-5 post-list">
      {posts.map((post) => {
        return (
          <li key={post.postId} className="post-list-item">
            <PostItem post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
