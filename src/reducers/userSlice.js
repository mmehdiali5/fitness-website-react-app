// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import posts from '../post-list/posts.json'
import users from '../TrainerFeed/users.json'

const initialState = {
  currentUser: {
    userId: 1,
    username: "mma",
    postPic: "samplepost.webp",
    profilePic: "default.jpg",
    email: "abc@gmail.com",
    phone: 123455,
    gender: "M",
    role: "User"
  }
};

function postUser(userId) {
  return users.find((user) => userId === user.userId);
}

function createPosts() {
  let postState = [];
  posts.forEach((post) => {
    postState.push({ ...post, ...postUser(post.userId) });
  });
  return postState;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export default userSlice.reducer;
