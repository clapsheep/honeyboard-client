import { api } from '@/services/common/axiosInstance';
import { TeamRequest, TeamUser } from '@/types/project/finale';
import { AxiosResponse } from 'axios';

export const getFinaleRemainingMemberAPI = async (generationId?: string) : Promise<AxiosResponse<TeamUser[]>> => {

  const response = await api.get(`/project/finale/team/remaining?generationId=${generationId}`)

  return response;
}

export const createFinaleTeamAPI = async (data: TeamRequest) : Promise<AxiosResponse<TeamRequest>> => {

  return api.post("/project/finale/team", data);
} 

export const updateFinaleTeamAPI = async (data: TeamRequest) : Promise<AxiosResponse<TeamRequest>>  => {

  return api.put(`/project/finale/team/update/${data.teamId}`, data);
}