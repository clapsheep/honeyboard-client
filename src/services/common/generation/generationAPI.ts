import { GenerationType } from '@/types/common/type';
import { api } from '../axiosInstance';

export const getGenerationListAPI = async (): Promise<GenerationType[]> => {
    const response = await api.get('/generation');
    return response.data;
};
