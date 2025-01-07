import { User } from './User';

export interface FinaleTeam {
    id: string;
    generationId: string;
    submittedAt: string;
    createdAt: string;
}
export interface FinaleTeamMemeber {
    id: string;
    finaleTeamId: string;
    userId: string;
    name: string;
    role: 'LEADER' | 'MEMBER';
    createdAt: string;
}

export interface FinaleProject {
    id: string;
    finaleTeamId: string;
    url: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    thumbnail: string;
}
export interface FinaleProjectBoard {
    id: string;
    finaleProjectId: string;
    finaleTeamId: string;
    summary: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    thumbnail: string;
}

export type FinaleProjectListResponse = {
    //프로젝트 리스트
    projects: Pick<
        FinaleProject,
        | 'id'
        | 'title'
        | 'description'
        | 'thumbnail'
        | 'createdAt'
        | 'finaleTeamId'
    > &
        { members: Pick<User, 'id' | 'name'>[] }[];
    //팀이 없는 유저
    noTeamUsers: Pick<User, 'id' | 'name'>[];
    // 팀 리스트
    teams: {
        members: Pick<FinaleTeamMemeber, 'id' | 'name' | 'role'>[];
        submitted: boolean;
        projectBoardId: string | null;
    };
};
export type FinaleProjectDetailResponse = Pick<
    FinaleProject,
    'id' | 'title' | 'description' | 'url' | 'createdAt' | 'finaleTeamId'
> & {
    members: Pick<FinaleTeamMemeber, 'userId' | 'name' | 'role'>[];
    boards: Pick<
        FinaleProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    >[];
};
export type FinaleProjectBoardDetailResponse = Pick<
    FinaleProjectBoard,
    'id' | 'title' | 'summary' | 'content' | 'createdAt'
> & {
    members: Pick<FinaleTeamMemeber, 'userId' | 'name' | 'role'>[];
};

export type FinaleProjectCreate = Pick<
    FinaleProject,
    'title' | 'description' | 'url'
> & { leader: User['id']; members: User['id'][] };

export type FinaleProjectTeamUpdate = {
    leader: User['id'];
    members: User['id'][];
};
export type FinaleProjectUpdate = Pick<
    FinaleProject,
    'title' | 'description' | 'url'
>;

export type FinaleProjectBoardRequest = Pick<
    FinaleProjectBoard,
    'title' | 'summary' | 'content' | 'thumbnail'
>;
