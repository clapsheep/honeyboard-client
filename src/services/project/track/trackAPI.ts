import { api } from '@/services/common/axiosInstance';
import { TrackProjectBoardDetail } from '@/types/project/track';

export const getTrackProjectBoardAPI = async (
    projectId: string,
    trackId: string,
): Promise<TrackProjectBoardDetail> => {
    const { data } = await api.get(
        `/project/track/${trackId}/board/${projectId}`,
    );
    return data;
};

export const createTrackProjectBoardAPI = async (
    trackId: string,
    projectTrackBoard: TrackProjectBoardDetail,
): Promise<TrackProjectBoardDetail> => {
    const { data } = await api.post(
        `/project/track/${trackId}/board`,
        projectTrackBoard,
    );
    return data;
};

export const updateTrackProjectBoardAPI = async (
    trackId: string,
    projectId: string,
    projectTrackBoard: TrackProjectBoardDetail,
): Promise<TrackProjectBoardDetail> => {
    const { data } = await api.put(
        `/project/track/${trackId}/board/${projectId}`,
        projectTrackBoard,
    );
    return data;
};
