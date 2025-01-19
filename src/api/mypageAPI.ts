import { BookmarkContent, ContentType } from '@/types/Bookmark';
import { PageResponse } from '@/types/common';
import { api } from '@/utils/common/axiosInstance';

export const getMyTrackAPI = async (): Promise<PageResponse<unknown>> => {
    const response = await api.get(`/user/trackproject`);
    return response.data;
};
export const getMyFinalAPI = async (): Promise<PageResponse<unknown>> => {
    const response = await api.get(`/user/finalproject`);
    return response.data;
};

export const getMyAlgorithmAPI = async (
    userId: string,
): Promise<PageResponse<unknown>> => {
    const response = await api.get(`/user/${userId}/algorithm`);
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
