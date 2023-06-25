import React from "react";
import {useDispatch} from "react-redux";
import {deletePost} from "../reducers/posts-reducer";

const PostItem = ({post}) => {
    const dispatch = useDispatch();
    console.log(post)
    const deletePostHandler = (id) => {
        dispatch(deletePost(id));
    }

    return (
        <li className="list-group-item">
            <div className="row">
                <div className={"col-2 col-xxl-1"}>
                    <img src={require(`../images/${post.profilePic}`)} height={48} width={48}
                         className="rounded-circle"/>
                </div>
                <div className="col-10 col-xxl-11">
                    <button type="button" className="btn-close float-end" aria-label="Close"
                            onClick={() => deletePostHandler(post.postId)}/>
                    <div>
                        <b>{post.username}</b>
                    </div>

                    <div className={"mb-1"}>{post.text}</div>

                </div>
            </div>
        </li>
    )
}

export default PostItem