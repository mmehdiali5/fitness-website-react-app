import React, { useEffect, useState } from "react"; // Import useHistory from React Router
import Feed from "./../Feed/feed";
import NavigationSidebar from "../nav/index.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getFollowers } from "../services/follow-service";
import {
  getFollowersThunk,
  getFollowingThunk,
} from "../services/follow-thunks";
import PostItem from "../post-list/post-item.js";

const api = axios.create();

const Details = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  let [detail, setDetail] = useState(null);
  const { posts } = useSelector((state) => state.posts);
const role = currentUser?.user?.role;
  const load = async () => {
    if(token){
      const response = await api.get(
          `http://206.189.181.234:8087/home/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setDetail(response.data);
    }else{
      const response = await api.get(`http://206.189.181.234:8087/no-auth/profile/${userId}`);
      setDetail(response.data);
    }

  };

  useEffect(() => {
    load();
  }, []);

  const handleFollow = async (isFollowing) => {
    const data = {
      userId: currentUser.user.id,
      followUserId: userId,
      isFollowing: isFollowing,
    };
    const response = await api.post(
      `http://206.189.181.234:8087/home/updateFollow`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await dispatch(getFollowersThunk(token));
    await dispatch(getFollowingThunk(token));
    await load();
  };

  return (
    <div>
      {detail && (
        <div className="profile">
          <div className="profile-container">
            <Feed />
            <div className="row">
              <div className="col-2 wd-nav">
                <NavigationSidebar />
              </div>
              <div className="col-1"></div>
              <div className="col-6">
                {detail && (
                  <div className="profile-details">
                    <div className="profile-card">
                      <div className="profile-card-header">
                        <img
                          className="rounded-circle profile-picture"
                          height={108}
                          width={108}
                          src={`${detail.fitUser.profilePicture}`}
                          alt="Profile Picture"
                        />
                        <span
                          style={{
                            marginLeft: "30px",
                            color: "black",
                            fontFamily: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {detail.user.firstName} {detail.user.lastName}
                        </span>
                        <div>
                          {" "}
                          <span style={{ marginLeft: "30px", color: "gray" }}>
                            @{detail.user.username}
                          </span>
                          {!detail.isFollowing && (token && role!="TRAINER") && (
                            <button
                              className="btn btn-primary unfollow"
                              onClick={() => {
                                handleFollow(true);
                              }}
                            >
                              FOLLOW
                            </button>
                          )}
                          {detail.isFollowing && (token && role!="TRAINER") &&(
                            <button
                              className="btn btn-primary unfollow"
                              onClick={() => {
                                handleFollow(false);
                              }}
                            >
                              UNFOLLOW
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {detail === null && (
                  <div className="profile-message">
                    PLEASE LOG IN TO SEE PROFILE
                  </div>
                )}
              </div>
              <div className="row justify-content-center">
                {detail && (
                  <div className="col-6 profile-posts">
                    {posts
                      .filter(
                        (post) => post.postUserName === detail.user.username
                      )
                      .map((post) => (
                        <li className="post-list-item" key={post.id}>
                          <PostItem post={post} />
                        </li>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Details;
