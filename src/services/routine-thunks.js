import {createAsyncThunk} from "@reduxjs/toolkit";
import * as routineService from "./routine-service";


export const getRoutineThunk = createAsyncThunk("routine/get", async (token) => {
    const response = await routineService.getWorkouts(token);
    return response;
});

export const getRoutineRequestsThunk = createAsyncThunk("routineRequests/get", async (token) => {
    const response = await routineService.getWorkoutsRequest(token);
    return response;
});


export const requestRoutineThunk = createAsyncThunk(
    "request/add", async (token) => {
        const response = await routineService.requestRoutine(token);
        return response;
    }
);

export const assignWorkoutThunk = createAsyncThunk("assignWorkout/post", async ({token, workouts}) => {
    const response = await routineService.assignWorkout(token, workouts);
    return response;
});

