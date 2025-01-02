import { api } from '../common/axiosInstance';
import { GenerationType } from '../common/generation';
import { StudentType } from './types';

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
export const updateStudentAPI = async (id: string, data: StudentType) => {
    const response = await api.put(`/admin/user/${id}`, data);
    return response.data;
};

// 기수관리
export const addGenerationsAPI = async (data: GenerationType) => {
    const response = await api.post('/admin/generation', data);
    return response.data;
};

export const deleteGenerationsAPI = async (id: string) => {
    const response = await api.delete(`/admin/generation/${id}`);
    return response.data;
};
export const updateGenerationsAPI = async (
    id: string,
    data: GenerationType,
) => {
    const response = await api.put(`/admin/generation/${id}`, data);
    return response.data;
};
