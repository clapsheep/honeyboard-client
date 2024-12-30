import { api } from '@/services/common/axiosInstance';
import { Event } from '@/types/schedule';
import { AxiosResponse } from 'axios';
const { VITE_BASE_API } = import.meta.env;

// 일정 조회 API
export const getScheduleEventsAPI = async (): Promise<
    AxiosResponse<Event[]>
> => {
    const response = await api.get(`${VITE_BASE_API}/schedule/calendar`);
    return response;
};

// 일정 등록 API
export const addScheduleEventsAPI = async (
    event: Event,
): Promise<AxiosResponse<Event>> => {
    return api.post(`${VITE_BASE_API}/schedule`, event);
};

// 일정 수정 API
export const updateScheduleEventsAPI = async (
    event: Event,
): Promise<AxiosResponse<Event>> => {
    return api.post(`${VITE_BASE_API}/schedule/${event.scheduleId}`, event);
};

// 일정 삭제 API
export const deleteScheduleEventsAPI = async (
    scheduleId: string,
): Promise<AxiosResponse<Event>> => {
    return api.delete(`${VITE_BASE_API}/schedule/${scheduleId}`);
};
