import { MyAlgorithmSolutionResponse } from '@/types/AlgorithmSolution';
import { BookmarkListResponse, ContentType } from '@/types/Bookmark';
import { PageResponse } from '@/types/common';
import { MyFinaleProjectResponse } from '@/types/FinaleProject';
import { MyTrackProjectResponse } from '@/types/TrackProject';
import { api } from '@/utils/common/axiosInstance';

export const getMyTrackAPI = async (
    userId: string | null,
): Promise<MyTrackProjectResponse[]> => {
    const response = await api.get('/user/trackProject', {
        params: { userId },
    });

    return response.data;
};
export const getMyFinalAPI = async (
    userId: string | null,
): Promise<PageResponse<MyFinaleProjectResponse[]>> => {
    const response = await api.get('/user/finaleproject', {
        params: { userId },
    });
    console.log(userId);

    return response.data;
};

export const getMyAlgorithmAPI = async (
    userId: string,
): Promise<MyAlgorithmSolutionResponse[]> => {
    const response = await api.get('/user/algorithm', {
        params: { userId },
    });
    return response.data;
};

export const getMyBookmarkAPI = async <T extends ContentType>({
    contentType,
}: {
    contentType: T;
}): Promise<BookmarkListResponse[T]> => {
    const response = await api.get(`/bookmark/${contentType}`);

    return response.data;
};
