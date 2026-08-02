import axiosClient from "./axiosClient";

export const loginUser = async(credentials) => {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data
};

export const getUserInfo = async()=>{
    const response = await axiosClient.get('/auth/user');
    return response.data
};