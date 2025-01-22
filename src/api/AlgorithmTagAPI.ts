import { TagResponse } from '@/types/Tag';
import { api } from '@/utils/common/axiosInstance';

export const getAlgorithmTagsAPI = async (
    keyword: string,
): Promise<TagResponse[]> => {
    const { data } = await api.get('/algorithm/tag', {
        params: { keyword },
    });
    return data;
};
