import axios from "axios";

//const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;


const SERVER_API_URL = "http://206.189.181.234:8087/authenticate/";

const USERS_URL = `${SERVER_API_URL}`;


const api = axios.create(/*{withCredentials: true}*/);


export const login = async ({username, password}) => {

    const response = await api.post(`${USERS_URL}`, {username, password});

    /*.then(response =>

          response.data);*/

    return response;

};


export const profile = async (token) => {
    //console.log("Hello");
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    };

//   console.log(`Bearer ${token}`);

    console.log(config)

    const response = await api.get(
        `http://206.189.181.234:8087/home/basic`,
        config
    );


    console.log(response);

    //return response.data;

    return response;

};


export const register = async (user) => {

    const response = await api.post(`${USERS_URL}register`, user);

    return response.data;

};


export const logout = async () => {
    return null;
};


export const updateUser = async (user, token) => {

    const response = await api.post("http://206.189.181.234:8087/home/update-profile", user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;

};

export const deleteUser = async (userId, token) => {
    const response = await api.post(`http://206.189.181.234:8087/admin/delete/${userId}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}

export const getTrainerRequests = async (token) => {
    const response = await api.get("http://206.189.181.234:8087/admin/trainers", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data;
}

export const approveTrainerRequest = async (token, userId) => {
    const response = await api.post(`http://206.189.181.234:8087/admin/approve/${userId}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data;
}
