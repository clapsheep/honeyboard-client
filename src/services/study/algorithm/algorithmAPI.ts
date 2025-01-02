import { api } from '@/services/common/axiosInstance';
import { PageResponse } from '@/types/common/type';
import { AlgorithmProblem, AlgorithmConcept } from './type';

export const getAlgorithmConceptsAPI = async (
    generationId: string,
    page: number,
    size: number,
    title?: string,
): Promise<PageResponse<AlgorithmConcept>> => {
    const { data } = await api.get('algorithm/guide', {
        params: {
            generationId,
            page,
            size,
            ...(title && { title }),
        },
    });

    return data;
};

export const getAlgorithmProblemsAPI = async (
    page: number,
    size: number,
): Promise<PageResponse<AlgorithmProblem>> => {
    const { data } = await api.get('/algorithm/problem', {
        params: {
            page,
            size,
        },
    });
    return data;
};
