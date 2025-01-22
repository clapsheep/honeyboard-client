import axios from 'axios';
import { queryClient } from './queryClient';

const { VITE_BASE_API } = import.meta.env;
export const api = axios.create({
    baseURL: VITE_BASE_API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            queryClient.setQueryData(['auth'], { isAuthenticated: false });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);
