import React, {useEffect, useState} from "react";
import Feed from "../Feed/feed";
import NavigationSidebar from "../nav/index.js";
import "./users.css";
import {useDispatch} from "react-redux";
import {profileThunk} from "../services/auth-thunks";
import {getAllUsersThunk, getFollowersThunk, getFollowingThunk} from "../services/follow-thunks";

import {useSelector} from "react-redux";

import {useNavigate} from "react-router-dom";

const Users = () => {

    const followers = useSelector(state => state.follow.followers);
    const following = useSelector(state => state.follow.following);
    const allUsers = useSelector(state => state.follow.allUsers);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const load = async () => {
            if (token) {
                await dispatch(getFollowersThunk(token))
                await dispatch(getFollowingThunk(token))
            }
            await dispatch(getAllUsersThunk())
        };
        load();
    }, []);

    const [activeTab, setActiveTab] = useState("followers");
    const navigate = useNavigate();
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const {currentUser} = useSelector((state) => state.user);
const role = currentUser?.user?.role;
console.log(role)
    /*const followers = [
      { id: 1, name: "John Doe", picture: "../images/john.jpg" },
      { id: 2, name: "John Doe", picture: "../images/john.jpg" },
      { id: 3, name: "John Doe", picture: "../images/john.jpg" },
      { id: 4, name: "John Doe", picture: "../images/john.jpg" }
    ];*/

    /*const following = [
        {id: 1, name: "John Doe", picture: "../images/john.jpg"},
        {id: 2, name: "John Doe", picture: "../images/john.jpg"},
        {id: 3, name: "John Doe", picture: "../images/john.jpg"},
        {id: 4, name: "John Doe", picture: "../images/john.jpg"},
        {id: 5, name: "John Doe", picture: "../images/john.jpg"},
    ];*/

    /*const allUsers = [
        {id: 1, name: "John Doe", picture: "../images/john.jpg"},
        {id: 2, name: "John Doe", picture: "../images/john.jpg"},
        {id: 3, name: "John Doe", picture: "../images/john.jpg"},
        {id: 4, name: "John Doe", picture: "../images/john.jpg"},
        {id: 5, name: "John Doe", picture: "../images/john.jpg"},
    ];*/

    const renderUsersList = (users) => {
        return (
            <div className="row">
                {users.map((user) => (
                    <div key={user.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={user.profilePicture}
                                className="card-img-top"
                                alt={"/images/default.jpg"}/>
                            <div className="card-body">
                                <div className="user-info">
                                    <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => navigate(`/details/${user.userId}`)} // Change This To The Clicked Username
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (

        <div className="users-container">
            <Feed/>
            <div className="row">
                <div className="col-2 wd-nav">
                    <NavigationSidebar/>
                </div>
                <div className="col-9">
                    {(token === null || role == "TRAINER") && allUsers && (
                        <>
                            <div
                                className={`tab-pane ${
                                    activeTab === "all" ? "active" : ""
                                }`}
                                id="all"
                            >

                            </div>
                            {renderUsersList(allUsers)}
                        </>
                    )}
                    {role!="TRAINER" && followers && following && allUsers && (
                        <div>
                            <div className="nav-tabs-container">
                                <ul className="nav nav-tabs">
                                    <li
                                        className={`nav-item ${
                                            activeTab === "followers" ? "active" : ""
                                        }`}
                                    >
                                        <button
                                            className="nav-link"
                                            onClick={() => handleTabChange("followers")}
                                        >
                                            <span className="tab-title">Followers</span>
                                            {activeTab === "followers" && (
                                                <span className="tab-indicator"></span>
                                            )}
                                        </button>
                                    </li>
                                    <li
                                        className={`nav-item ${
                                            activeTab === "following" ? "active" : ""
                                        }`}
                                    >
                                        <button
                                            className="nav-link"
                                            onClick={() => handleTabChange("following")}
                                        >
                                            <span className="tab-title">Following</span>
                                            {activeTab === "following" && (
                                                <span className="tab-indicator"></span>
                                            )}
                                        </button>
                                    </li>
                                    <li
                                        className={`nav-item ${
                                            activeTab === "all" ? "active" : ""
                                        }`}
                                    >
                                        <button
                                            className="nav-link"
                                            onClick={() => handleTabChange("all")}
                                        >
                                            <span className="tab-title">Find!</span>
                                            {activeTab === "all" && (
                                                <span className="tab-indicator"></span>
                                            )}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            {" "}
                            <div className="content-container">
                                <h3>
                                    {activeTab === "followers"
                                        ? "Followers"
                                        : activeTab === "following"
                                            ? "Following"
                                            : "Find Users"}
                                </h3>
                                <hr/>
                                <div className="tab-content">
                                    <div
                                        className={`tab-pane ${
                                            activeTab === "followers" ? "active" : ""
                                        }`}
                                        id="followers"
                                    >
                                        {renderUsersList(followers)}
                                    </div>
                                    <div
                                        className={`tab-pane ${
                                            activeTab === "following" ? "active" : ""
                                        }`}
                                        id="following"
                                    >
                                        {renderUsersList(following)}
                                    </div>
                                    <div
                                        className={`tab-pane ${
                                            activeTab === "all" ? "active" : ""
                                        }`}
                                        id="all"
                                    >
                                        {renderUsersList(allUsers)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default Users;
