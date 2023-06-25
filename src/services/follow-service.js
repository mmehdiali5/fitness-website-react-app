import axios from "axios";


const SERVER_POST_API_URL = "http://206.189.181.234:8087/home";

const FOLLOWER_URL = `${SERVER_POST_API_URL}`;

const api = axios.create(/*{withCredentials: true}*/);


export const updateFollower = async (followingInfo, token) => {
    const response = await api.post(`${FOLLOWER_URL}/updateFollow`, followingInfo, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getFollowers = async (token) => {
    const response = await api.get(`${FOLLOWER_URL}/followers`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data;
};

export const getFollowing = async (token) => {
    const response = await api.get(`${FOLLOWER_URL}/following`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data;
};


export async function getAllUsers() {
    const response = await api.get(`http://206.189.181.234:8087/no-auth/users`
        /*, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }*/)
    return response.data;
}

