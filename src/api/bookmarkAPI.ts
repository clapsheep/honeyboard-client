import { BookmarkAPIRequestType, BookmarkedResponse } from '@/types/Bookmark';
import { api } from '@/utils/common/axiosInstance';

export const addBookmarkAPI = async ({
    contentType,
    contentId,
}: BookmarkAPIRequestType): Promise<BookmarkedResponse> => {
    const response = await api.post(`/bookmark/${contentType}/${contentId}`);
    return response.data;
};
export const deleteBookmarkAPI = async ({
    contentType,
    contentId,
}: BookmarkAPIRequestType): Promise<BookmarkedResponse> => {
    const response = await api.delete(`/bookmark/${contentType}/${contentId}`);
    return response.data;
};
