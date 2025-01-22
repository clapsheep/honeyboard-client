import { MyAlgorithmSolutionResponse } from '@/types/AlgorithmSolution';
import { BookmarkContent, ContentType } from '@/types/Bookmark';
import { MyFinaleProjectResponse } from '@/types/FinaleProject';
import { MyTrackProjectResponse } from '@/types/TrackProject';
import { api } from '@/utils/common/axiosInstance';

export const getMyTrackAPI = async (): Promise<MyTrackProjectResponse[]> => {
    const response = await api.get(`/user/trackproject`);
    return response.data;
};
export const getMyFinalAPI = async (): Promise<MyFinaleProjectResponse[]> => {
    const response = await api.get(`/user/finaleproject`);
    return response.data;
};

export const getMyAlgorithmAPI = async (): Promise<
    MyAlgorithmSolutionResponse[]
> => {
    const response = await api.get(`user/algorithm`);
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
