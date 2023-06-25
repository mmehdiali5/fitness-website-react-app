import {createSlice} from "@reduxjs/toolkit";
import {getFollowingThunk, getFollowersThunk, updateFollowerThunk,getAllUsersThunk} from "../services/follow-thunks";

const initialState = {
    following: null,
    followers: null,
    allUsers: null
}

const followSlice = createSlice({
    name: "follow",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getFollowersThunk.fulfilled]: (state, {payload}) => {
            state.followers = payload;
        },
        [getFollowingThunk.fulfilled]: (state, {payload}) => {
            state.following = payload;
        },
        [getAllUsersThunk.fulfilled]: (state, {payload}) => {
            state.allUsers = payload;
        },
    },
});
export default followSlice.reducer;


