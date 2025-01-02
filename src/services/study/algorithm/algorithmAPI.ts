import { api } from '@/services/common/axiosInstance';
import { PageResponse } from '@/types/common/type';
import { AlgorithmProblem } from './type';

export const getAlgorithmConceptsAPI = async (generationId: string) => {
    return api.get('/algorithm/concept', {
        params: {
            generationId,
        },
    });
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
