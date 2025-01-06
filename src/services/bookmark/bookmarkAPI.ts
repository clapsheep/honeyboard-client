import {
    BookmarkAPIRequestType,
    BookmarkContentTypeMap,
} from '@/types/mypage/types';

import { api } from '../common/axiosInstance';

export const getBookmarkAPI = async <T extends keyof BookmarkContentTypeMap>({
    id: userId,
    contentType,
}: BookmarkAPIRequestType & { contentType: T }): Promise<
    BookmarkContentTypeMap[T]
> => {
    const response = await api.get(`/user/${userId}/bookmark`, {
        params: {
            contentType,
        },
    });
    return response.data;
};
// 파라미터가 1개인 경우 2개인 경우 3개인 경우....
// 알고리즘 솔루션의 디테일을 받고 싶은 경우
// 다른 일반적인 경우와 다르게 아이디가 2개 필요함 (problemId, solutionId)
// 이 로직이 getList 하는 모든 로직과 동일한데 단지 파라미터의 갯수가 다르다는 이유로 함수를 또 만들어야 함
// 파라미터를 {}객체로 받게 되면 얕은 복사 관점에서 파라미터는 무조건 1개

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
