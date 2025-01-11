import { GenerationType } from '@/types/common';
import { StudentType } from '@/types/User';
import { api } from '../utils/common/axiosInstance';

// 학생관리
export const getStudentsAPI = async (
    generationId: number | null,
): Promise<StudentType[]> => {
    const response = await api.get('/admin/user', {
        params: {
            generationId: generationId || null,
        },
    });
    return response.data;
};
export const updateStudentAPI = async (id: number, data: StudentType) => {
    const response = await api.put(`/admin/user/${id}`, data);
    return response.data;
};

// 기수관리

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
