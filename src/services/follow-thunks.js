import {createAsyncThunk} from "@reduxjs/toolkit";
import * as followService from "./follow-service";


export const updateFollowerThunk = createAsyncThunk(
    "follower/update", async ({followerInfo, token}) => {
        return await followService.updateFollower(followerInfo, token);
    }
);

export const getFollowersThunk = createAsyncThunk("followers/get", async (token) => {
    return await followService.getFollowers(token);
});

export const getFollowingThunk = createAsyncThunk("following/get", async (token) => {
    return await followService.getFollowing(token);
});


export const getAllUsersThunk = createAsyncThunk("all/get", async () => {
    return await followService.getAllUsers();
});