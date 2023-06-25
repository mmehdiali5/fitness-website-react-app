import React, {useEffect} from "react";
import Feed from "../Feed/feed";
import NavigationSidebar from "../nav";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRoutineRequestsThunk} from "../services/routine-thunks";

const TrainerRequestPage = () => {
    const navigate = useNavigate();

    const profiles = useSelector(state => state.routine.requests);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.user);

    useEffect(() => {
        const load = async () => {
            await dispatch(getRoutineRequestsThunk(token));
        }
        load();
    }, [])

    const handleAssignRoutine = (userId) => {
        navigate(`/routineassign/${userId}`);
    };
    return (
        <div style={{backgroundColor: "#f2f2f2"}}>
            <Feed/>
            <div className="row">
                <div className="col-2 wd-nav">
                    <NavigationSidebar/>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1"></div>
                <div className="col-lg-6 col-md-8 col-sm-7 col-6">
                    <h2 className="mb-4">Pending Requests</h2>
                    {profiles.map((profile, index) => (
                        <div key={profile.user.id} className="card mb-3">
                            <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={profile.fitUser.profilePicture}
                                        alt="Profile"
                                        className="rounded-circle me-3"
                                        style={{width: "50px", height: "50px"}}
                                    />
                                    <div>
                                        <h5 className="card-title">{profile.user.username}</h5>
                                        <p className="card-text">
                                            <b>Height(cm):</b> {profile.fitUser.height} | <b>Weight(lb):</b> {profile.fitUser.weight}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary mt-3 mt-sm-0"
                                    onClick={() => handleAssignRoutine(profile.user.id)}
                                >
                                    Assign Routine
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainerRequestPage;
