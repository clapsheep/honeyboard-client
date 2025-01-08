import { api } from '@/utils/common/axiosInstance';
import { BookmarkAPIRequestType, BookmarkContent } from '@/types/Bookmark';

export const getBookmarkAPI = async <T extends keyof BookmarkContent>({
    id: userId,
    contentType,
}: BookmarkAPIRequestType & { contentType: T }): Promise<
    BookmarkContent[T]
> => {
    const response = await api.get(`/user/${userId}/bookmark`, {
        params: {
            contentType,
        },
    });
    return response.data;
};

export const addBookmarkAPI = async ({
    id: userId,
    contentType,
    contentId,
}: BookmarkAPIRequestType): Promise<unknown> => {
    const response = await api.post(`/user/${userId}/bookmark`, {
        contentType,
        contentId,
    });
    return response.data;
};
export const deleteBookmarkAPI = async ({
    id: userId,
    contentType,
    contentId,
}: BookmarkAPIRequestType): Promise<unknown> => {
    const response = await api.delete(
        `user/${userId}/bookmark/${contentType}/${contentId}`,
    );
    return response.data;
};
