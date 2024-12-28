import { api } from '@/services/common/axiosInstance';
import { AxiosResponse } from 'axios';
import { Message } from '@/types/chat';
import { PageResponse } from '@/types/common/type';
const { VITE_BASE_API } = import.meta.env;
export const getChatMessagesAPI = async (): Promise<
    AxiosResponse<PageResponse<Message>>
> => {
    const response = await api.get(`${VITE_BASE_API}/chat`);
    return response;
};
