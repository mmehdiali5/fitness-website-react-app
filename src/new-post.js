import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPostThunk, getPostThunk } from "./services/post-thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const NewPost = () => {
  const [post, setPost] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { currentUser } = useSelector((state) => state.user);

  const upload = () => {
    document.getElementById("selectImage").click();
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : "");
  };

  const postClickHandler = async () => {
    let image = "";

    if (selectedFile !== null) {
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);
      await axios
        .post(
          "https://api.imgbb.com/1/upload?key=057c9a9ac1bb914d95dfe4a1d47f50d5",
          fd
        )
        .then((res) => {
          image = res.data.data.display_url;
        });
    }

    const newPost = { postBody: post, postTitle: "abc", imageUrl: image };
    await dispatch(addPostThunk({ newPost, token }));
    await dispatch(getPostThunk(token));
    setPost("");
    setSelectedFileName("");
    setSelectedFile(null);
  };

  return (
    <>
      {currentUser !== null && (
        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-auto">
            <img
              className="rounded-circle"
              src={`${currentUser.fitUser.profilePicture}`}
              width={60}
              alt="User Profile"
            />
          </div>
          <div className="col-10">
            <div className="position-relative">
              <textarea
                value={post}
                placeholder="Write a new post"
                className="form-control rounded-lg bg-light shadow"
                style={{
                  height: "150px",
                  resize: "none",
                  borderRadius: "15px",
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  fontSize: "16px",
                  color: "#333",
                }}
                onChange={(event) => setPost(event.target.value)}
              ></textarea>
              <div
                className="position-absolute bottom-0 end-0 p-2 d-flex align-items-center"
                style={{ gap: "8px" }}
              >
                <input
                  id="selectImage"
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                  onChange={fileSelectedHandler}
                />
                <label htmlFor="selectImage">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-primary"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                </label>
                {selectedFileName && <span>{selectedFileName}</span>}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={postClickHandler}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </span>
              </div>
            </div>
          </div>
          <div className="col-12">
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
