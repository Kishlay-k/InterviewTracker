import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000/api/v1' });

export const getQuestions = (page,questionPerPage) => API.get(`/problemset/all/?page=${page}&num=${questionPerPage}`);
export const getQuestion = (id)=> API.get(`/problemset/${id}`);
export const getTopicwiseQuestion = (topic) => API.get(`/problemset/topicwise/${topic}`);