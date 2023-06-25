import React, {useEffect, useState} from "react";
import Feed from "./feed";
import NavigationSidebar from "../nav";
import {useDispatch, useSelector} from "react-redux";
import "./index.css";
import {Link} from "react-router-dom";
import {AiFillCheckCircle} from "react-icons/ai";
import {
    getFollowersThunk,
    getFollowingThunk,
} from "../services/follow-thunks";
import {getPostThunk} from "../services/post-thunks";
import PostItem from "../post-list/post-item.js";
import {useNavigate} from "react-router";
import {profileThunk, updateUserThunk} from "../services/auth-thunks";

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user);
    console.log(currentUser)
    const {search} = useSelector((state) => state.search);

    let [editMode, setEditMode] = useState(false);

    let [firstName, setFirstName] = useState(currentUser?.user.firstName);
    let [lastName, setLastName] = useState(currentUser?.user.lastName);
    let [height, setHeight] = useState(currentUser?.fitUser.height);
    let [weight, setWeight] = useState(currentUser?.fitUser.weight);

    const dispatch = useDispatch();
    const followers = useSelector((state) => state.follow.followers);
    const following = useSelector((state) => state.follow.following);
    const {posts} = useSelector((state) => state.posts);
    const token = useSelector((state) => state.user.token);
    let [noOfPosts, setNoOfPosts] = useState("");
    const navigate = useNavigate();

    const handleEditProfile = () => {
        setEditMode(true);
    };

    useEffect(() => {
        const load = async () => {
            if (token !== null) {
                await dispatch(getFollowingThunk(token));
                await dispatch(getFollowersThunk(token));
                await dispatch(getPostThunk(token));
                setNoOfPosts(currentUser &&
                    posts.filter(
                        (post) => post.postUserName === currentUser.user.username
                    ).length
                );
            } else {
                navigate("/login");
            }
        };
        load();
    }, []);


     const setUserFields = () => {
        if (currentUser) {
          setFirstName(currentUser.user.firstName);
          setLastName(currentUser.user.lastName);
          setHeight(currentUser.fitUser.height);
          setWeight(currentUser.fitUser.weight);
        }
      };
       useEffect(() => {
          setUserFields();
        }, [currentUser]);

    const handleSave = async () => {
        setEditMode(false);
        if (firstName === "") {
            alert("First Name cannot be an empty string");
            await setUserFields();
        } else if (lastName === "") {
            alert("Last Name cannot be an empty string");
            await setUserFields();
        } else if (height === "") {
            alert("Height cannot be null");
            await setUserFields();
        } else if (parseInt(height) < 0) {
            alert("Height cannot be negative");
            await setUserFields();
        } else if (weight === "") {
            alert("Weight cannot be null");
            await setUserFields();
        } else if (parseInt(weight) < 0) {
            alert("Weight cannot be negative");
            await setUserFields();
        } else {
            const user = {
                userId: currentUser.user.id,
                firstName: firstName,
                lastName: lastName,
                height: height,
                weight: weight
            };
            try {
                await dispatch(updateUserThunk({token: token, user: user}));
                await dispatch(profileThunk(token));
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setHeight(user.height);
                setWeight(user.weight);
            } catch (e) {
                alert(e);
            }
        }
    };

    useEffect(() => {
        const load = async () => {
            if (token !== null) {
                await dispatch(getFollowingThunk(token));
                await dispatch(getFollowersThunk(token));
                await dispatch(getPostThunk(token));
                setNoOfPosts(currentUser &&
                    posts.filter(
                        (post) => post.postUserName === currentUser.user.username
                    ).length
                );
            } else {
                navigate("/login");
            }
        };
        load();
    }, []);

    return (
        <>
            {followers && following && posts && (
                <div className="profile">
                    <div className="profile-container">
                        <Feed/>
                        <div className="row">
                            <div className="col-lg-2 d-none d-lg-block wd-nav">
                                <NavigationSidebar/>
                            </div>
                            <div className="col-1"></div>
                      <div className="col-lg-6">
                                {currentUser && (
                                    <div className="profile-details">
                                        <div className="profile-card">
                                            <div className="profile-card-header">
                                                <img
                                                    className="rounded-circle profile-picture"
                                                    height={88}
                                                    width={88}
                                                    src={`${currentUser.fitUser.profilePicture}`}
                                                    alt="Profile Picture"
                                                />
                                                &nbsp; &nbsp;
                                                <Link to="/users" className="profile-stat-link">
                          <span className="profile-stat">
                            {followers.length}
                          </span>
                                                    <span> followers </span>
                                                </Link>
                                                <span style={{marginLeft: "10px"}}> | </span>
                                                &nbsp; &nbsp; &nbsp;
                                                <Link to="/users" className="profile-stat-link">
                          <span className="profile-stat">
                            {following.length}
                          </span>
                                                    &nbsp;
                                                    <span>following </span>
                                                </Link>
                                                <span style={{marginLeft: "10px"}}> | </span>
                                                &nbsp; &nbsp; &nbsp;
                                                <span className="profile-stat">{noOfPosts}</span>
                                                &nbsp;
                                                <span>posts</span>
                                                &nbsp; &nbsp; &nbsp;
                                                {currentUser && (
                                                    <span className="edit-profile-button">
                            {editMode ? (
                                <button
                                    className="rounded-pill btn btn-primary mt-2 ps-3 pe-3 fw-bold"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="rounded-pill btn btn-primary mt-2 pe-3 fw-bold"
                                    onClick={handleEditProfile}
                                >
                                    Edit Profile
                                </button>
                            )}
                          </span>
                                                )}
                                                <div>
                          <span style={{marginLeft: "10px", color: "gray"}}>
                            @{currentUser.user.username}
                          </span>
                                               </div>
                         </div>
                                            <div className="profile-card-body">
                                                <div className="profile-field">
                                                    <span className="profile-label">FirstName:</span>{" "}
                                                    <input
                                                        type="text"
                                                        className={`profile-input square-input ${
                                                            editMode ? "editable" : ""
                                                        }`}
                                                        value={firstName}
                                                        readOnly={!editMode}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="profile-field">
                                                    <span className="profile-label">LastName:</span>{" "}
                                                    <input
                                                        type="text"
                                                        className={`profile-input square-input ${
                                                            editMode ? "editable" : ""
                                                        }`}
                                                        value={lastName}
                                                        readOnly={!editMode}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="profile-field">
                                                    <span className="profile-label">Height(cm):</span>{" "}
                                                    <input
                                                        type="number"
                                                        className={`profile-input square-input ${
                                                            editMode ? "editable" : ""
                                                        }`}
                                                        value={height}
                                                        readOnly={!editMode}
                                                        onChange={(e) => setHeight(e.target.value)}
                                                    />
                                                </div>
                                                <div className="profile-field">
                                                    <span className="profile-label">Weight(lb):</span>{" "}
                                                    <input
                                                        type="text"
                                                        className={`profile-input square-input ${
                                                            editMode ? "editable" : ""
                                                        }`}
                                                        value={weight}
                                                        readOnly={!editMode}
                                                        onChange={(e) => setWeight(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {currentUser === null && (
                                    <div className="profile-message">
                                        PLEASE LOG IN TO SEE PROFILE
                                    </div>
                                )}
                            </div>
                            <div className="row justify-content-center">
                                {currentUser && (
                                    <div className="col-6 profile-posts">
                                        {posts
                                            .filter(
                                                (post) =>
                                                    post.postUserName === currentUser.user.username
                                            )
                                            .map((post) => (
                                                <li className="post-list-item" key={post.id}>
                                                    <PostItem post={post}/>
                                                </li>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
