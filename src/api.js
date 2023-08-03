import axios from "axios";

const baseURL = "https://b3291f45-cbd6-494a-8adc-dd67f9c5b864.mock.pstmn.io";


export const getUserApi = () => axios.get(`${baseURL}/users`);
export const getTasksListAPI = () => axios.get(`${baseURL}/tasks`);