import { api } from '@/services/common/axiosInstance';
import { WebConcept, WebRecommend } from './type';
import { PageResponse } from '@/types/common/type';

export const getWebConceptsAPI = async (
    generationId: string,
    page: number,
    size: number,
): Promise<PageResponse<WebConcept>> => {
    const { data } = await api.get('/web/guide', {
        params: {
            generationId,
            page,
            size,
        },
    });
    return data;
};

export const createWebConceptAPI = async (
    WebConcept: WebConcept,
): Promise<WebConcept> => {
    return await api.post('/web/guide', WebConcept);
};

export const getWebRecommendsAPI = async (
    generationId: string,
    page: number,
    size: number,
): Promise<PageResponse<WebRecommend>> => {
    const { data } = await api.get('/web/recommend', {
        params: {
            generationId,
            page,
            size,
        },
    });
    return data;
};
