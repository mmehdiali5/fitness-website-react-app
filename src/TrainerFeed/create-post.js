import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPostThunk} from "../services/post-thunks";

const CreatePost = () => {
    let [post, setPost] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser);
    const postClickHandler = () => {
        console.log("Hello" + user);
        const newPost = {post_body: post, post_title: "", image_url: "../images/sample.jpeg"}
        dispatch(addPostThunk(newPost))
        setPost("");
    }

    return (
        <div className={"row mb-2"}>
            <div className="col-auto">
                <img src={require(`../images/default.jpg`)} width={60}/>
            </div>

            <div className="col-10">
                <textarea value={post} placeholder="Write a Post"
                          className="form-control border-0"
                          onChange={(event) => setPost(event.target.value)}>
       </textarea>

            </div>
            <div>
                <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                        onClick={postClickHandler}>
                    Post
                </button>
            </div>
        </div>
    )

};

export default CreatePost