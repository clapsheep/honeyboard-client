import { api } from '@/utils/common/axiosInstance';
import {
    FinaleProjectBoardDetailResponse,
    FinaleProjectBoardRequest,
    FinaleProjectCreate,
    FinaleProjectDetailResponse,
    FinaleProjectListResponse,
    FinaleProjectTeamUpdate,
    FinaleProjectUpdate,
} from '@/types/FinaleProject';
import { data } from 'react-router';

// 1. 파이널 프로젝트 리스트 조회 FinaleProjectListResponse
export const getFinaleProjectListAPI = async (req: {
    generationId: string | null;
}): Promise<FinaleProjectListResponse> => {
    const response = await api.get(`/project/finale`, {
        params: { generationId: req.generationId },
    });
    return response.data;
};

// 1-1. 파이널 프로젝트 생성 (팀 + 프로젝트) FinaleProjectCreate
export const createFinaleProjectAPI = async (req: {
    data: FinaleProjectCreate;
}): Promise<unknown> => {
    return api.post(`/project/finale`, req.data);
};

// 2. 파이널 프로젝트 디테일 조회 FinaleProjectDetailResponse
export const getFinaleProjectDetailAPI = async (req: {
    finaleProjectId: string;
}): Promise<FinaleProjectDetailResponse> => {
    return api.get(`/project/finale/${req.finaleProjectId}`);
};

// 2-1. 파이널 프로젝트 팀 수정 -> 팀원만 가능 FinaleProjectTeamUpdate
export const updateFinaleProjectTeamAPI = async (req: {
    finaleProjectId: string;
    finaleTeamId: string;
    data: FinaleProjectTeamUpdate;
}): Promise<unknown> => {
    return api.put(
        `/project/finale/${req.finaleProjectId}/team/${req.finaleTeamId}`,
        req.data,
    );
};

// 2-2. 파이널 프로젝트 수정 -> 팀원만 가능 FinaleProjectUpdate
export const updateFinaleProjectAPI = async (req: {
    finaleProjectId: string;
    data: FinaleProjectUpdate;
}): Promise<unknown> => {
    return api.put(`/project/finale/${req.finaleProjectId}`, req.data);
};

// 2-3. 파이널 프로젝트 삭제 -> 팀원만 가능
export const deleteFinaleProjectAPI = async (req: {
    finaleProjectId: string;
}): Promise<unknown> => {
    return api.delete(`/project/finale/${req.finaleProjectId}`);
};

// 2-4. 파이널 프로젝트 보드 작성 -> 팀원만 가능
export const createFinaleProjectBoardAPI = async (req: {
    finalProjectId: string;
    data: FinaleProjectBoardRequest;
}): Promise<unknown> => {
    return api.post(`/project/finale/${req.finalProjectId}/board`, req.data);
};
// 3. 파이널 프로젝트 보드 조회
export const getFinaleProjectBoardDetailAPI = async (req: {
    finalProjectId: string;
    boardId: string;
}): Promise<FinaleProjectBoardDetailResponse> => {
    const {data} = await api.get(
        `/project/finale/${req.finalProjectId}/board/${req.boardId}`,
    );
    return data;
};
// 3-1. 파이널 프로젝트 보드 수정 -> 팀원만 가능
export const updateFinaleProjectBoardAPI = async (req: {
    finalProjectId: string;
    boardId: string;
    data: FinaleProjectBoardRequest;
}): Promise<unknown> => {
    return api.put(
        `/project/finale/${req.finalProjectId}/board/${req.boardId}`,
        req.data,
    );
};
// 3-2. 파이널 프로젝트 보드 삭제 -> 팀원만 가능
export const deleteFinaleProjectBoardAPI = async (req: {
    finalProjectId: string;
    boardId: string;
}): Promise<unknown> => {
    return api.delete(
        `/project/finale/${req.finalProjectId}/board/${req.boardId}`,
    );
};
