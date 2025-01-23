import { MyAlgorithmSolutionResponse } from '@/types/AlgorithmSolution';
import { BookmarkContent, ContentType } from '@/types/Bookmark';
import { MyFinaleProjectResponse } from '@/types/FinaleProject';
import { MyTrackProjectResponse } from '@/types/TrackProject';
import { api } from '@/utils/common/axiosInstance';

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
    const response = await api.get('/user/algorithm', {
        params: { userId },
    });
    return response.data;
};

export const getMyBookmarkAPI = async <T extends ContentType>({
    contentType,
}: {
    contentType: T;
}): Promise<BookmarkContent[T]> => {
    const response = await api.get(`/bookmark/${contentType}`);

    return response.data;
};
