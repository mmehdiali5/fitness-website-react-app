import React, {useEffect, useState} from "react";
import "./login.css";
import {loginThunk, profileThunk} from "./services/auth-thunks";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavigationSidebar from "./nav";
import Feed from "./Feed/feed.js";

const Card = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {role} = useSelector(state => state.user);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    useEffect(() => {
        if (role === "USER") {
            navigate("/post");
        } else if (role === "ADMIN") {
            navigate("/admin");
        } else if (role === "TRAINER") {
            navigate("/trainerrequest");
        } else if (role === "UNASSIGNED") {
            alert("REQUEST FOR TRAINER PENDING BY ADMIN. PLEASE WAIT...");
        }
    }, [role])

    const handleSubmit = async () => {
        try {
            await dispatch(loginThunk({username, password}));
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div style={{backgroundColor: "#f2f2f2"}}>
            <Feed/>
            <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-12 wd-nav">
                    <NavigationSidebar/>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-6 col-md-9 col-sm-12">
                    <div className="login-innerCard">
                        <h1>Welcome to our Fitness app</h1>
                        <input
                            value={username}
                            type="text"
                            placeholder="Name"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <input
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="cardbuttons">
                            <button className="loginbutton" onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                        <p className="signup-link">
                            Not a member? <Link to="/signup">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
