import { api } from '@/services/common/axiosInstance';
import { PageResponse } from '@/types/common/type';
import {
    AlgorithmGuideDetailResponse,
    AlgorithmGuideListResponse,
    AlgorithmGuideRequest,
} from '@/types/new/AlgorithmGuide';
import { PageRequest, SearchRequest } from '@/types/new/common';

export interface AlgorithmGuideRequestParams<T> {
    pageRequest?: PageRequest;
    searchRequest?: SearchRequest<T>;
    generationId?: string;
}
export const getAlgorithmGuideListAPI = async ({
    pageRequest = { currentPage: 1, pageSize: 8 },
    searchRequest,
    generationId,
}: AlgorithmGuideRequestParams<'title' | 'content'>): Promise<
    PageResponse<AlgorithmGuideListResponse>
> => {
    const { data } = await api.get(`/algorithm/guide`, {
        params: { ...pageRequest, ...searchRequest, generationId },
    });
    return data;
};

export const getAlgorithmGuideDetailAPI = async (req: {
    guideId: string;
}): Promise<AlgorithmGuideDetailResponse> => {
    const { data } = await api.get(`/algorithm/guide/${req.guideId}`);
    return data;
};

export const createAlgorithmGuideAPI = async (req: {
    data: AlgorithmGuideRequest;
}): Promise<unknown> => {
    return api.post(`/algorithm/guide`, req.data);
};

export const updateAlgorithmGuideAPI = async (req: {
    guideId: string;
    data: AlgorithmGuideRequest;
}): Promise<unknown> => {
    return api.put(`/algorithm/guide/${req.guideId}`, req.data);
};

export const deleteAlgorithmGuideAPI = async (req: {
    guideId: string;
}): Promise<unknown> => {
    return api.delete(`/algorithm/guide/${req.guideId}`);
};
