import { AxiosResponse } from 'axios';
import { api } from '../common/axiosInstance';

const { VITE_BASE_API } = import.meta.env;
export const getAllFinalBoardAPI = async (
    generationId: string,
): Promise<AxiosResponse> => {
    const response = await api.get(
        `${VITE_BASE_API}/project/finale?generation=${generationId}`,
    );
    return response;
};

export const FinalBoardDetailAPI = async (
    trackId: string,
    boardId: string,
): Promise<AxiosResponse> => {
    const response = await api.get(
        `${VITE_BASE_API}/project/track/${trackId}/board/${boardId}`,
    );
    return response;
};

export const todaySubmitAPI = async (
    projectId: string,
    generationId?: string,
    date?: string,
): Promise<AxiosResponse> => {
    const response = await api.get(
        `${VITE_BASE_API}/project/finale/${projectId}/status?generation=${generationId}&date=${date}`,
    );
    return response;
};

export const remainUserAPI = async (
    generationId?: string,
): Promise<AxiosResponse> => {
    const response = await api.get(
        `${VITE_BASE_API}/project/finale/team/remaining?generation=${generationId}`,
    );
    return response;
};
