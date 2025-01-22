import { PageResponse } from '@/types/common';
import { api } from '@/utils/common/axiosInstance';
import { TrackProjectBoard } from '@/types/project/track';
import { AlgorithmSolution } from '@/types/study';

export const getMyTrackAPI = async (
    userId: string | null,
): Promise<TrackProjectBoard[]> => {
    const response = await api.get('/user/trackProject', {
        params: { userId },
    });

    return response.data;
};
export const getMyFinalAPI = async (
    userId: string | null,
): Promise<PageResponse<unknown>> => {
    const response = await api.get('/user/finaleproject', {
        params: { userId },
    });
    console.log(userId);

    return response.data;
};

export const getMyAlgorithmAPI = async (
    userId: string,
): Promise<AlgorithmSolution[]> => {
    const response = await api.get(`/user/algorithm`, {
        params: { userId },
    });
    return response.data;
};

export const getMyBookmarkAPI = async (
    userId: string,
): Promise<PageResponse<unknown>> => {
    const response = await api.get(`/user/${userId}/bookmark`);
    return response.data;
};
