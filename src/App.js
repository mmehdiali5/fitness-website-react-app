import "./App.css";
import React, {useState} from "react";
import Card from "./card";
import Home from "./home";
import Routine from "./routine-page/routine";
import Admin from "./admin/admin";
import Profile from "./Feed/profile";
import Users from "./Feed/users";
import {BrowserRouter} from "react-router-dom";
import Details from "./Details/details";
import {Routes, Route, Navigate} from "react-router";
//import PostList from "./TrainerFeed";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import NavigationSidebar from "./nav/index";
import postsReducer from "./reducers/posts-reducer.js";
import authReducer from "./reducers/auth-reducer.js";
import userReducer from "./reducers/userSlice";
import searchReducer from "./reducers/search-reducer.js";
import followReducer from "./reducers/follow-reducer.js";
import routineReducer from "./reducers/routine-reducer";
// import routineReducer from "./reducers/routine-reducer.js";
import AuthContext from "./auth-context";
import ProtectedRoute from "./protected-route";
import Post from "./Feed/post";
import Search from "./Search/search";
import SearchApi from "./Search/searchapi";
import Signup from "./credential/signup.js";
import NewPost from "./new-post";
import Feed from "./Feed/feed";
import LandingPage from "./landingpage/landing";
import TrainerRequestPage from "./trainerRoutine/trainerrequest";
import Trainerroutineassign from "./trainerRoutine/trainerroutineassign";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        user2: userReducer,
        user: authReducer,
        search: searchReducer,
        follow: followReducer,
        routine: routineReducer,
        // Add other reducers here if needed
    },
});

const App = () => {
    /*const [token, setToken] = useState();
          if (!token) {
              return (
                  <div className="login-outdivcard">
                      <Card setToken={setToken}/>
                  </div>
              )
          }*/
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AuthContext>
                    <Routes>
                        <Route
                            path={"/login"}
                            element={
                                <div>
                                    <Card /*setToken={setToken}*/ />
                                </div>
                            }
                        />
                        <Route
                            path={"/signup"}
                            element={
                                <div>
                                    <Signup/>
                                </div>
                            }
                        />
                        <Route path="/" element={<LandingPage/>}/>
                        <Route
                            path="/home/*"
                            element={
                                <ProtectedRoute>
                                    <Home/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/post"
                            element={
                                <ProtectedRoute>
                                    <Post/>
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/postAnon" element={<Post/>}/>
                        <Route
                            path="/routine"
                            element={
                                <ProtectedRoute>
                                    <Routine/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <ProtectedRoute>
                                    <Search/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute>
                                    <Users/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/usersAnon"
                            element={
                                <Users/>
                            }
                        />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <Admin/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nav"
                            element={
                                <ProtectedRoute>
                                    <NavigationSidebar/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/details/:userId"
                            element={
                                <Details/>
                            }
                        />

                        <Route
                            path={"/newPost"}
                            element={
                                <ProtectedRoute>
                                    <NewPost/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={"/trainerrequest"}
                            element={
                                <ProtectedRoute>
                                    <TrainerRequestPage/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={"/searchapi"}
                            element={
                                <SearchApi/>
                            }
                        />
                        <Route
                            path={"/routineassign/:userId"}
                            element={
                                <ProtectedRoute>
                                    <Trainerroutineassign/>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AuthContext>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
