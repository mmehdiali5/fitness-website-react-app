// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import search from '../Search/search-card.json'
import users from '../TrainerFeed/users.json'

const initialState = {
  currentUser: {
     "userId": 1,
        "username": "mma",
        "postPic": "samplepost.webp",
        "profilePic": "default.jpg",
        "email": "abc@gmail.com",
        "phone": 123455,
        "gender": "M",
        "role": "User"
  },
   search: search
};



const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {}
});

export default searchSlice.reducer;
