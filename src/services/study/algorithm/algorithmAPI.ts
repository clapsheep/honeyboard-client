import { api } from '@/services/common/axiosInstance';
import { PageResponse } from '@/types/common/type';
import {
    AlgorithmProblem,
    AlgorithmConcept,
    AlgorithmConceptDetail,
} from './type';

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

export const getAlgorithmConceptDetailAPI = async (
    conceptId: string,
): Promise<AlgorithmConceptDetail> => {
    const { data } = await api.get(`/algorithm/guide/${conceptId}`);
    return data;
};

export const createAlgorithmConceptAPI = async (
    AlgorithmConcept: AlgorithmConceptDetail,
): Promise<AlgorithmConceptDetail> => {
    const { data } = await api.post('/algorithm/guide', AlgorithmConcept);
    return data;
};

export const updateAlgorithmConceptAPI = async (
    AlgorithmConcept: AlgorithmConceptDetail,
): Promise<AlgorithmConceptDetail> => {
    const { data } = await api.put(
        `/algorithm/guide/${AlgorithmConcept.id}`,
        AlgorithmConcept,
    );
    return data;
};

export const deleteAlgorithmConceptAPI = async (
    webConceptId: string,
): Promise<void> => {
    await api.delete(`/algorithm/guide/${webConceptId}`);
};
