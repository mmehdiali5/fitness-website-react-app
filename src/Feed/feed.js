import React, {useState} from "react";
import "./feeds.css";
import {NavLink, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import {GoGear} from "react-icons/go";
import Post from "./post";

function Feed() {
    const {currentUser} = useSelector((state) => state.user);
    const role2 = useSelector((state) => state.user.role);
    const {token} = useSelector((state) => state.user);
    const role = "ANON";
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("feed");
    const navigate = useNavigate();
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            const searchQuery = e.target.value;
            navigate(`/search?query=${searchQuery}`);
        }
    };
    if (currentUser != null) {
        const role = currentUser.user.role;
    }
    return (
        <>
            <div
                className="container-fluid feed-page"
                style={{backgroundColor: "#8AC7DB"}}
            >
                <div className="row">
                    {currentUser && (
                        <div className="col-12 col-md-11 position-relative">
                            <input
                                placeholder="Search"
                                className="form-control rounded-pill pe-5 ps-5"
                                onKeyDown={handleSearch}
                            />
                            <AiOutlineSearch className="fs-3 position-absolute wd-nudge-up"/>
                        </div>
                    )}
                    <div className="col-12 col-md-1"></div>
                </div>
                <div className="scrollable-navbar">
                    <ul className="nav nav-pills mb-2 mt-2 wd flex-nowrap">

                        {role2 === "ADMIN" && <li className="nav-item">
                            <NavLink
                                to="/admin"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("admin")}
                            >
                                Admin Dashboard
                            </NavLink>
                        </li>}

                        {role2 !== "ADMIN" && role2 !== "TRAINER" &&
                        <li className="nav-item">
                            <NavLink
                                to={token ? "/post" : "/postAnon"}
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("feed")}
                            >
                                Feed
                            </NavLink>
                        </li>}

                        {role2 === "USER" && <li className="nav-item">
                            <NavLink
                                to="/profile"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("profile")}
                            >
                                Profile
                            </NavLink>
                        </li>}

                        {role2 === "USER" && <li className="nav-item">
                            <NavLink
                                to="/routine"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("routine")}
                            >
                                Routine
                            </NavLink>
                        </li>}


                        {role2 == "USER" && token && <li className="nav-item">
                            <NavLink
                                to="/users"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("users")}
                            >
                                Users
                            </NavLink>
                        </li>}

                        {(!token || role2 == "TRAINER") && <li className="nav-item">
                            <NavLink
                                to="/usersAnon"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("users")}
                            >
                                Users
                            </NavLink>
                        </li>}


                        <li className="nav-item">
                            <NavLink
                                to="/searchapi"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("searchapi")}
                            >
                                Search Workout
                            </NavLink>
                        </li>

                        {role2 === "TRAINER" && <li className="nav-item">
                            <NavLink
                                to="/trainerrequest"
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleTabClick("trainerrequest")}
                            >
                                Assign Routine
                            </NavLink>
                        </li>}

                    </ul>
                </div>
                <div className="position-relative mb-2"></div>
            </div>
        </>
    );
}

export default Feed;
