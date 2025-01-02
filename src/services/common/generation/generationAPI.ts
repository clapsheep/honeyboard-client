import { api } from '../axiosInstance';
import { GenerationType } from './types';

export const getGenerationListAPI = async (): Promise<GenerationType[]> => {
    const response = await api.get('/generation');
    return response.data;
};
