import { api } from '@/utils/common/axiosInstance';

import { PageRequest, PageResponse } from '@/types/common';
import { Message } from '@/types/Message';
const { VITE_BASE_API } = import.meta.env;
export const getChatMessagesAPI = async ({
    currentPage = 1,
    pageSize = 50,
}: PageRequest): Promise<PageResponse<Message>> => {
    const { data } = await api.get(`${VITE_BASE_API}/chat`, {
        params: { currentPage, pageSize },
    });
    return {
        content: data.content,
        pageInfo: data.pageInfo,
    };
};
