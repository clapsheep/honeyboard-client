import { TagResponse } from '@/types/Tag';
import { api } from '@/utils/common/axiosInstance';

export const getAlgorithmTagsAPI = async (req: {
    searchValue: string;
}): Promise<TagResponse[]> => {
    const params = req ? { req } : {};
    const { data } = await api.get('/algorithm/tag/', { params });
    return data;
};
