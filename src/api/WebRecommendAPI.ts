import { PageRequest, PageResponse } from '@/types/common';

import { api } from '@/utils/common/axiosInstance';
import {
    WebRecommendDetailResponse,
    WebRecommendListResponse,
    WebRecommendRequest,
} from '@/types/WebRecommend';

export interface WebRecommendRequestParams {
    pageRequest?: PageRequest;
    generationId?: string | null;
    searchTitle?: string;
}
export const getWebRecommendListAPI = async ({
    pageRequest = { currentPage: 1, pageSize: 8 },
    generationId,
    searchTitle: title,
}: WebRecommendRequestParams): Promise<
    PageResponse<WebRecommendListResponse>
> => {
    const { data } = await api.get(`/web/recommend`, {
        params: { ...pageRequest, generationId, title },
    });
    return data;
};
export const getWebRecommendDetailAPI = async (req: {
    recommendId: string;
}): Promise<WebRecommendDetailResponse> => {
    const { data } = await api.get(`/web/recommend/${req.recommendId}`);
    return data;
};

export const createWebRecommendAPI = async (req: {
    data: WebRecommendRequest;
}): Promise<unknown> => {
    return api.post(`/web/recommend`, req.data);
};

export const updateWebRecommendAPI = async (req: {
    recommendId: string;
    data: WebRecommendRequest;
}): Promise<unknown> => {
    return api.put(`/web/recommend/${req.recommendId}`, req.data);
};

export const deleteWebRecommendAPI = async (req: {
    recommendId: string;
}): Promise<unknown> => {
    return api.delete(`/web/recommend/${req.recommendId}`);
};
