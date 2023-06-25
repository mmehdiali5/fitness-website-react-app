import React, {useEffect, useState} from "react";// Import useHistory from React Router
import Feed from "../Feed/feed";
import "./index.css";
import NavigationSidebar from "../nav/index.js";
import {useDispatch, useSelector} from "react-redux";
import {getRoutineThunk, requestRoutineThunk} from "../services/routine-thunks";

const Routine = () => {
    const todos = useSelector(state => state.routine.routines);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.user);

    useEffect(() => {
        const load = async () => {
            await dispatch(getRoutineThunk(token));
        }
        load();
    }, [])


    const handleRequestRoutine = async () => {
        await dispatch(requestRoutineThunk(token));
        await dispatch(getRoutineThunk(token));
    };

    return (
        <div style={{backgroundColor: "#f2f2f2"}}>

            <Feed/>
            <div className="row">
                <div className="col-2 wd-nav">
                    <NavigationSidebar/>
                </div>
                <div className="col-1">
                </div>
                <div className="col-6">

                    <div className="routine-header">
                        <h1>MY ROUTINE</h1>
                        <button
                            onClick={() => handleRequestRoutine(0)}
                            className="del rounded-pill btn btn-primary mt-2 ps-3 pe-3 fw-bold"
                        >
                            Request Routine
                        </button>
                    </div>


                    {todos.length !== 0 ? (
                        <table className="table table-striped table-bordered rounded">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Set</th>
                                <th>Reps</th>
                            </tr>
                            </thead>
                            <tbody>
                            {todos.map((todo, ndx) => (
                                <tr key={todo.id}>
                                    <td>{todo.name}</td>
                                    <td>{todo.instructions}</td>
                                    <td>{todo.sets}</td>
                                    <td>{todo.reps}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-routines">
                            <h4 className="h4">Your request is pending OR Request New Routine</h4>
                        </div>
                    )}
                </div>


            </div>

        </div>
    );
};
export default Routine;