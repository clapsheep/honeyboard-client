import { api } from '@/utils/common/axiosInstance';

import {
    AlgorithmGuideDetailResponse,
    AlgorithmGuideListResponse,
    AlgorithmGuideRequest,
} from '@/types/AlgorithmGuide';
import { PageRequest, PageResponse } from '@/types/common';

export interface AlgorithmGuideRequestParams {
    pageRequest?: PageRequest;
    generationId?: string | null;
    searchTitle?: string;
}
export const getAlgorithmGuideListAPI = async ({
    pageRequest = { currentPage: 1, pageSize: 8 },
    searchTitle: title,
    generationId,
}: AlgorithmGuideRequestParams): Promise<
    PageResponse<AlgorithmGuideListResponse>
> => {
    const { data } = await api.get(`/algorithm/guide`, {
        params: { ...pageRequest, title, generationId },
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
