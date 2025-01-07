import { api } from '@/utils/common/axiosInstance';
import { AxiosResponse } from 'axios';

import { PageResponse } from '@/types/common';
import { Message } from '@/types/Message';
const { VITE_BASE_API } = import.meta.env;
export const getChatMessagesAPI = async (): Promise<
    AxiosResponse<PageResponse<Message>>
> => {
    const response = await api.get(`${VITE_BASE_API}/chat`);
    return response;
};
