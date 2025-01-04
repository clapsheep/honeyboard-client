import { TeamRequest } from "@/types/project/finale";
import { createFinaleTeamAPI } from "./finaleAPI";
import { NavigateFunction } from "react-router";

export const handleCreate = async (
  data: TeamRequest,
  navigate: NavigateFunction,
) => {
    try {
        const res = await createFinaleTeamAPI(data);

        if (res.status === 200) {
            navigate('/final');
        }
        return;
    } catch (error) {
        console.error('Create Team falied: ', error);
        throw new Error('팀 생성에 실패했습니다.');
    }
};