import { api } from '@/utils/common/axiosInstance';
import { GenerationType } from '@/types/common';

export const getGenerationListAPI = async (): Promise<GenerationType[]> => {
    const response = await api.get('/generation');
    return response.data;
};
