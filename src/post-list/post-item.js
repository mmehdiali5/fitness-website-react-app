import { useDispatch, useSelector } from "react-redux";
import PostStats from "./post-stats";
import { AiFillCheckCircle } from "react-icons/ai";
import "./postItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { deletePostThunk, getPostThunk } from "../services/post-thunks";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const deletePostHandler = async (id) => {
    await dispatch(deletePostThunk({ id, token }));
    await dispatch(getPostThunk(token));
  };

  return (
    <>
      <li className="list-group-item temp">
        <div className="row tempd">
          <div className="col-auto">
            <img
              className="float-end rounded-circle rounded-image"
              src={post.postProfilePicUrl}
              height={48}
              width={48}
            />
          </div>
          <div className="col-10 image-container">
            <div className="tuit-info">
              <span className="fw-bolder">{post.postUserName}</span>
              <AiFillCheckCircle className="tuit-verified-icon" />
              <span className="text-muted">
                @{post.postUserName}  {post.time}
              </span>
            </div>
            <div>{post.postBody}</div>
            {post.imageUrl !== "" && (
              <img
                src={`${post.imageUrl}`}
                height={400}
                width={450}
                alt="Sample"
                className="rounded-wd mt-3 img-fluid"
              />
            )}
          </div>
          <div>
            {currentUser && post.postUserName === currentUser.user.username && (
              <div
                className="btn delete-button trashpos"
                onClick={() => deletePostHandler(post.postId)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="red-trash-icon" />{" "}
              </div>
            )}
          </div>

          <div className="col-auto">
            <div className="tuit-stats-container image-container moveLeft">
              {<PostStats key={post.postId} post={post} />}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default PostItem;
