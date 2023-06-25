import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {useSelector} from "react-redux";
import PostItem from "./post-item";

const PostList = () => {
    const {posts} = useSelector((state) => state.posts)
    return (
        <ul className="list-group">
            {
                posts.map(post => {
                    return <PostItem
                        key={post.postId} post={post}/>
                })

            }
        </ul>
    );
};
export default PostList;