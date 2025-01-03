import { GenerationType } from '@/types/common/type';
import { api } from '../common/axiosInstance';

export const addGenerationAPI = async (generation: GenerationType) => {
    const response = await api.post('/admin/generation', generation);
    return response.data;
};
export const activeGenerationAPI = async (generationId: number) => {
    const response = await api.patch(
        `/admin/generation/${generationId}/isActive`,
    );
    return response.data;
};
export const deleteGenerationAPI = async (generationId: number) => {
    const response = await api.delete(`/admin/generation/${generationId}`);
    return response.data;
};
