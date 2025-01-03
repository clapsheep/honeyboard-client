import { bookMarkType, contentType } from '@/types/study/type';
import { api } from '../common/axiosInstance';

export const addBookMarkAPI = async (
    userId: string,
    req: bookMarkType,
): Promise<bookMarkType[]> => {
    const { data } = await api.post(`/user/${userId}/bookmark`, req);
    return data;
};

export const getBookMarkAPI = async (
    userId: string,
    params: {
        contentType: contentType;
    },
): Promise<bookMarkType[]> => {
    const { data } = await api.get(`/user/${userId}/bookmark`, { params });
    return data;
};

export const deleteBookMarkAPI = async (
    userId: string,
    contentId: string,
): Promise<bookMarkType[]> => {
    const { data } = await api.delete(`/user/${userId}/bookmark/${contentId}`);
    return data;
};
