import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsersThunk} from "../services/follow-thunks";
import {useNavigate} from "react-router-dom";
import "./index.css";

const SearchList = ({searchKeyword}) => {
    //const {search} = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [search, setSearch] = useState([]);
    const {token} = useSelector((state) => state.user);
    const {currentUser} = useSelector((state) => state.user);
    const allUsers = useSelector(state => state.follow.allUsers);
    useEffect(() => {
        console.log("SEARCH EXECUTED")
        const load = async () => {
            const allUsers = await dispatch(getAllUsersThunk(token)).then(res => res.payload);
            setSearch(allUsers.filter((user) =>
                user.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchKeyword.toLowerCase())
            ))
            console.log("SEARCH " + JSON.stringify(allUsers))
        }
        load();
    }, [])
    const renderUsersList = () => {
        return (
            <div className="row">

                {search.map((search) => (
                    <div key={search.userId} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={search.profilePicture}
                                className="card-img-top"
                                alt={"/images/default.jpg"}/>
                            <div className="card-body">
                                <div className="user-info">
                                    <h5 className="card-title">{search.firstName} {search.lastName}</h5>
                                    <button
                                        className="btn btn-primary btn-sm profileview"
                                        onClick={() => navigate(`/details/${search.userId}`)} // Change This To The Clicked Username
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

        <div>


            {renderUsersList()}
        </div>

    );
};

export default SearchList;