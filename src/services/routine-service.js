import axios from "axios";

const SERVER_ROUTINE_API_URL = "http://206.189.181.234:8087/home";

const ROUTINES_URL = `${SERVER_ROUTINE_API_URL}`;

const api = axios.create(/*{withCredentials: true}*/);


export const getWorkouts = async (token) => {
    const response = await api.get(`${ROUTINES_URL}/my-workouts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data;
};

export const getWorkoutsRequest = async (token) => {
    const response = await api.get("http://206.189.181.234:8087/trainer/requests", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data;
};

export const requestRoutine = async (token) => {
    const response = await api.post(`${ROUTINES_URL}/request`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const assignWorkout = async (token, workouts) => {
    const response = await api.post("http://206.189.181.234:8087/trainer/create-routine", workouts, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}