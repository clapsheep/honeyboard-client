import { api } from '@/services/common/axiosInstance';
import {
    WebConcept,
    WebConceptDetail,
    WebRecommend,
    WebRecommendDetail,
} from '../../../types/study/type';
import { PageResponse } from '@/types/common/type';

//웹 개념
export const getWebConceptsAPI = async (
    generationId: string | null,
    currentPage: number,
    pageSize: number,
    title?: string,
): Promise<PageResponse<WebConcept>> => {
    const { data } = await api.get('/web/guide', {
        params: {
            generationId: generationId || null,
            currentPage,
            pageSize,
            ...(title && { title }),
        },
    });
    return data;
};

export const getWebConceptDetailAPI = async (
    conceptId: string,
): Promise<WebConceptDetail> => {
    const { data } = await api.get(`/web/guide/${conceptId}`);
    return data;
};

export const createWebConceptAPI = async (
    webConcept: WebConceptDetail,
): Promise<WebConceptDetail> => {
    const { data } = await api.post('/web/guide', webConcept);
    return data;
};
export const updateWebConceptAPI = async (
    webConcept: WebConceptDetail,
): Promise<WebConceptDetail> => {
    const { data } = await api.put(`/web/guide/${webConcept.id}`, webConcept);
    return data;
};
export const deleteWebConceptAPI = async (
    webConceptId: string,
): Promise<void> => {
    await api.delete(`/web/guide/${webConceptId}`);
};

// 웹 추천
export const getWebRecommendsAPI = async (
    generationId: string | null,
    currentPage: number,
    pageSize: number,
    title?: string,
): Promise<PageResponse<WebRecommend>> => {
    const { data } = await api.get('/web/recommend', {
        params: {
            generationId: generationId || null,
            currentPage,
            pageSize,
            ...(title && { title }),
        },
    });
    return data;
};

export const getWebRecommendDetailAPI = async (
    recommendId: string,
): Promise<WebRecommendDetail> => {
    const { data } = await api.get(`/web/recommend/${recommendId}`);
    return data;
};

export const createWebRecommendAPI = async (
    webRecommend: WebRecommendDetail,
): Promise<WebRecommendDetail> => {
    const { data } = await api.post('/web/recommend', webRecommend);
    return data;
};
export const updateWebRecommendAPI = async (
    webRecommend: WebRecommendDetail,
): Promise<WebRecommendDetail> => {
    const { data } = await api.put(
        `/web/recommend/${webRecommend.id}`,
        webRecommend,
    );
    return data;
};
export const deleteWebRecommendAPI = async (
    webRecommendId: string,
): Promise<void> => {
    await api.delete(`/web/recommend/${webRecommendId}`);
};
