import {createSlice} from "@reduxjs/toolkit";
import posts from '../post-list/posts.json'
import users from '../TrainerFeed/users.json'
import {addPostThunk, deletePostThunk, getPostThunk, getPostThunkWithoutToken} from "../services/post-thunks";
import {getPostsWithoutToken} from "../services/post-service";

const currentUser = {
    "userId": 1,
    "username": "mma",
    "postPic": "samplepost.webp",
    "profilePic": "default.jpg",
    "email": "abc@gmail.com",
    "phone": 123455,
    "gender": "M",
    "role": "User"
};

const templatePost = {
    ...currentUser,
    "likes": 0
}


function postUser(userId) {
    return users.find((user) => userId === user.userId);
}

function createPosts() {
    let postState = [];
    posts.map((post) => {
        postState.push({...post, ...postUser(post.userId)});
    })
    return postState;
}

const postsSlice = createSlice({
    name: 'posts',
    initialState: {posts: []},
    reducers: {
        /*createPost(state, action) {
            state.posts.unshift({
                ...action.payload,
                ...templatePost,
                postId: (new Date()).getTime(),
            })
        },*/
        /*deletePost(state, action) {
            const index = state.posts
                .findIndex(post =>
                    post.postId === action.payload);
            state.posts.splice(index, 1);
        },*/

    },
    extraReducers: {
        [addPostThunk.fulfilled]: (state, {payload}) => {

        },
        [getPostThunk.fulfilled]: (state, {payload}) => {
            console.log("INSIDE GET POST THUNK");
            state.posts = payload.postList;
        },
        [deletePostThunk.fulfilled]: (state, {payload}) => {
            //
        },
        [getPostThunkWithoutToken.fulfilled]: (state, {payload}) => {
            state.posts = payload.postList;
        }
    }

});

export const {deletePost} = postsSlice.actions;
export default postsSlice.reducer;
