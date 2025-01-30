import { api } from '@/utils/common/axiosInstance';
import {
    TrackProjectBoardDetailResponse,
    TrackProjectBoardRequest,
    TrackProjectDetailResponse,
    TrackProjectListResponse,
    TrackProjectRequest,
    TrackProjectResponse,
} from '@/types/TrackProject';
import { AvailableUserListResponse, TeamMemberListRequest } from '@/types/User';
import { AxiosResponse } from 'axios';
import { CreateResponse } from '@/types/common';

// 1. 트랙 프로젝트 리스트 조회 TrackProjectListResponse
export const getTrackProjectListAPI = async (req: {
    generationId?: string | null;
}): Promise<TrackProjectListResponse> => {
    const response = await api.get(`/project/track`, {
        params: { generationId: req.generationId },
    });
    return response.data;
};
// 1-1. 트랙 프로젝트 생성 -> 강사님만 가능 TrackProjectRequest
export const createTrackProjectAPI = async (
    req: TrackProjectRequest,
): Promise<AxiosResponse<TrackProjectResponse>> => {
    return api.post(`/project/track`, req);
};

// 2. 트랙 프로젝트 디테일 조회 TrackProjectDetailResponse
export const getTrackProjectDetailAPI = async (
    trackProjectId: string,
): Promise<TrackProjectDetailResponse> => {
    const { data } = await api.get(`/project/track/${trackProjectId}`);
    return data;
};
// 2-1. 트랙 프로젝트 수정 -> 강사님만 가능 TrackProjectRequest
export const updateTrackProjectAPI = async (req: {
    trackProjectId: string;
    data: TrackProjectRequest;
}): Promise<TrackProjectResponse> => {
    return api.put(`/project/track/${req.trackProjectId}`, req.data);
};
// 2-2. 트랙 프로젝트 삭제 -> 강사님만 가능
export const deleteTrackProjectAPI = async (
    trackProjectId: string,
): Promise<unknown> => {
    return api.delete(`/project/track/${trackProjectId}`);
};
// 2-3. 트랙 프로젝트 팀 생성 -> TrackTeamRequest
export const createTrackTeamAPI = async (req: {
    trackProjectId: string;
    data: TeamMemberListRequest;
}): Promise<AxiosResponse<TrackProjectResponse>> => {
    return api.post(`/project/track/${req.trackProjectId}/team`, req.data);
};
// 2-4. 트랙 프로젝트 보드 생성 -> 팀 생성 선행이 필요
export const createTrackProjectBoardAPI = async (req: {
    trackProjectId: string;
    trackTeamId: string;
    board: TrackProjectBoardRequest;
}): Promise<CreateResponse> => {
    const { data } = await api.post<CreateResponse>(
        `/project/track/${req.trackProjectId}/team/${req.trackTeamId}/board`,
        req.board,
    );
    return data;
};

// 3. 트랙 프로젝트 보드 조회 TrackProjectBoardDetailResponse
export const getTrackProjectBoardDetailAPI = async (req: {
    trackProjectId: string;
    trackTeamId: string;
    boardId: string;
}): Promise<TrackProjectBoardDetailResponse> => {
    const { data } = await api.get(
        `/project/track/${req.trackProjectId}/team/${req.trackTeamId}/board/${req.boardId}`,
    );

    return data;
};

// 3-1. 트랙 프로젝트 보드 수정 -> 팀원만 가능
export const updateTrackProjectBoardAPI = async (req: {
    trackProjectId: string;
    trackTeamId: string;
    boardId: string;
    data: TrackProjectBoardRequest;
}): Promise<unknown> => {
    return api.put(
        `/project/track/${req.trackProjectId}/team/${req.trackTeamId}/board/${req.boardId}`,
        req.data,
    );
};
// 3-2. 트랙 프로젝트 보드 삭제 -> 팀원만 가능
export const deleteTrackProjectBoardAPI = async (req: {
    trackProjectId: string;
    trackTeamId: string;
    boardId: string;
}): Promise<unknown> => {
    return api.delete(
        `/project/track/${req.trackProjectId}/team/${req.trackTeamId}/board/${req.boardId}`,
    );
};
// 3-3. 트랙 프로젝트 팀 수정 -> 팀원만 가능
export const updateTrackTeamAPI = async (req: {
    trackProjectId: string;
    trackTeamId: string;
    data: TeamMemberListRequest;
}): Promise<AxiosResponse<TrackProjectResponse>> => {
    return api.put(
        `/project/track/${req.trackProjectId}/team/${req.trackTeamId}`,
        req.data,
    );
};

// 4. 트랙프로젝트 가능 유저 조회 -> 팀생성을 위한 조회
export const getTrackProjectAvailableUserAPI = async (req: {
    trackProjectId: string;
}): Promise<AvailableUserListResponse> => {

    const { data } = await api.get(`/project/track/${req.trackProjectId}/available-user`)

    return data;
};

// 5. 트랙프로젝트 제외 유저 조회 -> 프로젝트 수정을 위한 조회

export const getTrackProjectExcludeMembersAPI = async (req:{
    trackProjectId: string;
}):Promise<AvailableUserListResponse> => {

    const { data } = await api.get(`/project/track/${req.trackProjectId}/exclude-members`)

    return data;
}
