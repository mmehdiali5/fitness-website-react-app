import {createAsyncThunk} from "@reduxjs/toolkit";
import * as postService from "./post-service";

export const addPostThunk = createAsyncThunk(
    "post/add", async ({newPost, token}) => {
        const response = await postService.addPost(newPost, token);
        return response;
    }
);

export const deletePostThunk = createAsyncThunk(
    "post/add", async ({id, token}) => {
        const response = await postService.deletePost(id, token);
        return response;
    }
);

export const getPostThunk = createAsyncThunk("post/get", async (token) => {
    const response = await postService.getPosts(token);
    return response;
});

export const getPostThunkWithoutToken = createAsyncThunk("post/get", async () => {
    const response = await postService.getPostsWithoutToken();
    return response;
});

export const likeUpdateThunk = createAsyncThunk("post/like", async ({postId, userId, isLike, token}) => {
    const response = await postService.likeUpdate(postId, userId, isLike, token);
    return response;
});
