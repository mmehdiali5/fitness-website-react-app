import React from "react";// Import useHistory from React Router
import Feed from "./feed";
import NavigationSidebar from "../nav/index.js";
import NewPost from "../new-post";
import "./post.css";
import PostList from "../post-list/post-list";
import {useSelector} from "react-redux";

const Post = () => {

    const {currentUser} = useSelector((state) => state.user);

    return (
        <div style={{backgroundColor: "#f2f2f2"}}>

            <Feed/>
            <div className="row">
                <div className="col-2 wd-nav">
                    <NavigationSidebar/>
                </div>
                <div className="col-1">
                </div>
                <div className="col-6 wd-post">
                    {currentUser && <NewPost/>}
                    <PostList/>
                </div>
            </div>
        </div>

    );
};

export default Post;