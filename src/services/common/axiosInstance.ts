import axios from 'axios';

const { VITE_BASE_API } = import.meta.env;
export const api = axios.create({
    baseURL: VITE_BASE_API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
