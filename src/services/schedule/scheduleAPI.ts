import { api } from '@/services/common/axiosInstance';
import { ScheduleEvent } from '@/types/schedule';
import { AxiosResponse } from 'axios';
const { VITE_BASE_API } = import.meta.env;

// 일정 조회 API
export const getScheduleEventsAPI = async (
    year: number,
    month: number,
): Promise<AxiosResponse<ScheduleEvent[]>> => {
    const response = await api.get(
        `${VITE_BASE_API}/schedule/${year}/${month}`,
    );
    return response;
};

// 일정 등록 API
export const addScheduleEventsAPI = async (
    event: ScheduleEvent,
): Promise<AxiosResponse<ScheduleEvent>> => {
    return api.post(`${VITE_BASE_API}/schedule`, event);
};

// 일정 수정 API
export const updateScheduleEventsAPI = async (
    event: ScheduleEvent,
): Promise<AxiosResponse<ScheduleEvent>> => {
    return api.post(`${VITE_BASE_API}/schedule/${event.scheduleId}`, event);
};

// 일정 삭제 API
export const deleteScheduleEventsAPI = async (
    scheduleId: string,
): Promise<AxiosResponse<Event>> => {
    return api.delete(`${VITE_BASE_API}/schedule/${scheduleId}`);
};
