import { api } from '@/services/common/axiosInstance';
import { TeamUser } from '@/types/project/finale';
import { AxiosResponse } from 'axios';

export const getFinaleRemainingMemberAPI = async (generationId?: string) : Promise<AxiosResponse<TeamUser[]>> => {

  const response = await api.get(`/project/finale/team/remaining?generationId=${generationId}`)

  return response;
}