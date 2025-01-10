import { api } from '@/utils/common/axiosInstance';
import { PageRequest, PageResponse } from '@/types/common';
import {
    WebGuideDetailResponse,
    WebGuideListResponse,
    WebGuideRequest,
} from '@/types/WebGuide';

export interface WebGuideRequestParams {
    pageRequest?: PageRequest;
    generationId?: string | null;
    searchTitle?: string;
}

export const getWebGuideListAPI = async ({
    pageRequest = { currentPage: 1, pageSize: 8 },
    generationId,
    searchTitle: title,
}: WebGuideRequestParams): Promise<PageResponse<WebGuideListResponse>> => {
    const { data } = await api.get(`/web/guide`, {
        params: {
            ...pageRequest,
            generationId,
            title,
        },
    });
    return data;
};
export const getWebGuideDetailAPI = async (req: {
    guideId: string;
}): Promise<WebGuideDetailResponse> => {
    const { data } = await api.get(`/web/guide/${req.guideId}`);
    return data;
};
export const createWebGuideAPI = async (req: {
    data: WebGuideRequest;
}): Promise<unknown> => {
    const { data } = await api.post(`/web/guide`, req.data);
    return data;
};
export const updateWebGuideAPI = async (req: {
    guideId: string;
    data: WebGuideRequest;
}): Promise<unknown> => {
    return api.put(`/web/guide/${req.guideId}`, req.data);
};
export const deleteWebGuideAPI = async (req: {
    guideId: string;
}): Promise<unknown> => {
    return api.delete(`/web/guide/${req.guideId}`);
};
