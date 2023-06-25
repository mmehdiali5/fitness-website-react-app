import {createSlice} from "@reduxjs/toolkit";
import {assignWorkoutThunk, getRoutineRequestsThunk, getRoutineThunk} from "../services/routine-thunks";
import {getWorkoutsRequest} from "../services/routine-service";

const routinesSlice = createSlice({
    name: 'routines',
    initialState: {
        routines: [],
        requests: []
    },
    reducers: {},
    extraReducers: {
        [getRoutineThunk.fulfilled]: (state, {payload}) => {
            state.routines = payload;
        },
        [getRoutineRequestsThunk.fulfilled]: (state, {payload}) => {
            state.requests = payload;
        },
        [assignWorkoutThunk.fulfilled]:(state,{payload})=>{
            alert("Successfully assigned the workout");
        }
    }

});

export default routinesSlice.reducer;