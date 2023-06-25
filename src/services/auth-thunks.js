import {createAsyncThunk} from "@reduxjs/toolkit";
import * as authService from "./auth-service";


export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await authService.login(credentials);
        if (user.code === 403) {
            throw new Error("Username Already exists");
        }
        return user.data;
    }
);


export const profileThunk = createAsyncThunk(
    "auth/profile", async (token) => {
        const response = await authService.profile(token);
        return response.data;
    });

export const registerThunk = createAsyncThunk(
    "user/register", async (credentials) => {
        const user = await authService.register(credentials);
        if (user.code === 400) {
            throw new Error("Username Already exists");
        }
        return user;
    }
)


export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
        return authService.logout();
    });

export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async ({user, token}) => {
        const response = await authService.updateUser(user, token);
        if (response.code === 400 || response.code === 500 || response.code === 404) {
            throw new Error(response.message);
        }
        return user;
    });


export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser", async ({userId, token}) => {
        const response = await authService.deleteUser(userId, token);
        if (response.code === 400 || response.code === 500 || response.code === 404) {
            throw new Error(response.message);
        }
        return response;
    });

export const getTrainerRequestThunk = createAsyncThunk(
    "admin/trainerRequest", async (token) => {
        const response = await authService.getTrainerRequests(token);
        return response;
    });


export const approveTrainerRequestThunk = createAsyncThunk(
    "admin/trainerRequestApproval", async ({token, userId}) => {
        const response = await authService.approveTrainerRequest(token, userId);
        return response;
    });