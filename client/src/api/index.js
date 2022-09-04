import axios from "axios";

const API = axios.create({ 
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
    credentials: 'include'  
});

export const getQuestions = (page,questionPerPage) => API.get(`/problemset/all/?page=${page}&num=${questionPerPage}`);
export const getQuestion = (id)=> API.get(`/problemset/${id}`);
export const getTopicwiseQuestion = (topic) => API.get(`/problemset/topicwise/${topic}`);
export const loginUser = (body) =>API.post('/auth/login', {...body});
export const getUser = ()=> API.get('/auth/getuser'); 
export const logout = () => API.post('/auth/logout');
export const signupUser = (body) => API.post('/auth/signup',{...body});
export const forgotPassword = (body) => API.post('/auth/forgotpassword', {...body});
export const resetPassword = (token, body) => API.post(`/auth/resetpassword/${token}`, {...body});
export const changePassword = (body) => API.post('/auth/changepassword', {...body});