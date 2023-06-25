import React, {useEffect, useState} from "react";
import Feed from "../Feed/feed";
import NavigationSidebar from "../nav/index.js";
import "./index.css";
import {getAllUsersThunk} from "../services/follow-thunks";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    approveTrainerRequestThunk,
    deleteUserThunk,
    getTrainerRequestThunk,
    updateUserThunk
} from "../services/auth-thunks";


// UserTable component
const UserTable = ({users, editUsers, handleEdit, handleSave, handleDelete, handleInputChange}) => {
    // Render the user table JSX code here
    if (!users) {
        return null; // Handle the case when users is null
    }
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Height</th>
                <th>Weight</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.userId}>
                    <td>
                        {editUsers[user.userId] ? (
                            <input
                                type="number"
                                value={editUsers[user.userId]?.height || user.height}
                                onChange={(e) =>
                                    handleInputChange(e, user.userId, "height")
                                }
                            />
                        ) : (
                            user.height
                        )}
                    </td>
                    <td>
                        {editUsers[user.userId] ? (
                            <input
                                type="number"
                                value={editUsers[user.userId]?.weight || user.weight}
                                onChange={(e) =>
                                    handleInputChange(e, user.userId, "weight")
                                }
                            />
                        ) : (
                            user.weight
                        )}
                    </td>
                    <td>
                        {editUsers[user.userId] ? (
                            <input
                                type="text"
                                value={editUsers[user.userId]?.firstName || user.firstName}
                                onChange={(e) =>
                                    handleInputChange(e, user.userId, "firstName")
                                }
                            />
                        ) : (
                            user.firstName
                        )}
                    </td>
                    <td>
                        {editUsers[user.userId] ? (
                            <input
                                type="text"
                                value={editUsers[user.userId]?.lastName || user.lastName}
                                onChange={(e) =>
                                    handleInputChange(e, user.userId, "lastName")
                                }
                            />
                        ) : (
                            user.lastName
                        )}
                    </td>
                    <td>
                        <div className="button-container">
                            {editUsers[user.userId] ? (
                                <button
                                    className="btn btn-primary rounded-pill mt-2 px-2 py-1 btn-sm edit"
                                    onClick={() => handleSave(user.userId)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary rounded-pill mt-2 px-2 py-1 btn-sm edit"
                                    onClick={() => handleEdit(user.firstName, user.lastName, user.userId)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="btn btn-danger rounded-pill mt-2 px-2 py-1 btn-sm delete"
                                onClick={() => handleDelete(user.userId)}
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

// TrainerTable component

const TrainerTable = ({requests}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const [tempRequest, setTempRequest] = useState(requests);

    const handleApprove = async (userId) => {
        await dispatch(approveTrainerRequestThunk({token, userId}));
        setTempRequest(await dispatch(getTrainerRequestThunk(token)))
    };
    return (
        <>
            <table className="table table-bordered">
                <thead>
                <tr>

                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Approve</th>

                </tr>
                </thead>
                <tbody>

                {tempRequest.payload.map((request) => {
                    return (
                        <tr>
                            <td>
                                {request.firstName}
                            </td>
                            <td>
                                {request.lastName}
                            </td>
                            <td>
                                <button className={"btn btn-success"} onClick={() => {
                                    handleApprove(request.id)
                                }}>Approve
                                </button>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </>
    );
};


const Admin = () => {
    const {currentUser} = useSelector((state) => state.user);
    const allUsers = useSelector((state) => state.follow.allUsers);
    const allTrainers = useSelector((state) => state.follow.allTrainers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const load = async () => {
            await dispatch(getAllUsersThunk(token));
            setRequests(await dispatch(getTrainerRequestThunk(token)));
        };
        load();
    }, []);

    const [editUsers, setEditUsers] = useState({});
    const [editTrainers, setEditTrainers] = useState({});
    const [activeTab, setActiveTab] = useState("users");

    const handleEdit = (firstName, lastName, userId) => {
        // Perform save logic here
        if (activeTab === "users") {
            setEditUsers((prevUsers) => ({
                ...prevUsers,
                [userId]: true,
            }));
        } else if (activeTab === "trainers") {
            setEditTrainers((prevTrainers) => ({
                ...prevTrainers,
                [userId]: true,
            }));
        }
    };

    const handleSave = async (userId) => {
        // Perform save logic here
        if (activeTab === "users") {
            const editedUser = editUsers[userId];
            let user = {userId: userId};
            if (editedUser.firstName) {
                user = {"firstName": editedUser.firstName, ...user};
            }
            if (editedUser.lastName) {
                user = {"lastName": editedUser.lastName, ...user};
            }
            if (editedUser.height) {
                user = {"height": editedUser.height, ...user};
            }
            if (editedUser.weight) {
                user = {"weight": editedUser.weight, ...user};
            }

            await dispatch(updateUserThunk({user, token}));
            await dispatch(getAllUsersThunk(token));
            setEditUsers((prevUsers) => ({
                ...prevUsers,
                [userId]: false,
            }));

        } else if (activeTab === "trainers") {
            setEditTrainers((prevTrainers) => ({
                ...prevTrainers,
                [userId]: false,
            }));
        }
    };

    const handleDelete = async (userId) => {
        // Perform delete logic here
        await dispatch(deleteUserThunk({userId, token}));
        await dispatch(getAllUsersThunk(token));
    };

    const handleInputChange = (e, userId, field) => {
        const {value} = e.target;
        if (activeTab === "users") {
            setEditUsers((prevUsers) => ({
                ...prevUsers,
                [userId]: {
                    ...prevUsers[userId],
                    [field]: value,
                },
            }));
        } else if (activeTab === "trainers") {
            setEditTrainers((prevTrainers) => ({
                ...prevTrainers,
                [userId]: {
                    ...prevTrainers[userId],
                    [field]: value,
                },
            }));
        }
    };
    return (
        <>
            <div style={{backgroundColor: "#f2f2f2"}}>
                <Feed/>
                <div className="row">
                    <div className="col-lg-2 d-none d-lg-block wd-nav">
                        <NavigationSidebar/>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-7">
                        <ul className="nav nav-pills mb-2 mt-2 ad flex-nowrap">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                                    onClick={() => setActiveTab("users")}
                                >
                                    User
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === "trainers" ? "active" : ""}`}
                                    onClick={() => setActiveTab("trainers")}
                                >
                                    Trainer
                                </button>
                            </li>
                            <div
                                className="highlight-line"
                                style={{
                                    width: activeTab === "users" ? "120px" : "160px",
                                    right: activeTab === "users" ? "0px" : "20px"
                                }}
                            ></div>
                        </ul>
                        {activeTab === "users" && (
                            <UserTable
                                users={allUsers}
                                editUsers={editUsers}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                                handleDelete={handleDelete}
                                handleInputChange={handleInputChange}
                            />
                        )}
                        {activeTab === "trainers" && (
                            <TrainerTable
                                requests={requests}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;