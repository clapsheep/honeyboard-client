import { TeamMemberListRequest, User } from './User';

export interface FinaleTeam {
    id: string;
    generationId: string;
    submittedAt: string;
    createdAt: string;
}
export interface FinaleTeamMember {
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

// [RESPONSE]
// 파이널 프로젝트 리스트 조회 응답 타입
export type FinaleProjectListResponse = {
    //프로젝트 리스트
    projects: (Pick<
        FinaleProject,
        'id' | 'title' | 'description' | 'thumbnail' | 'createdAt'
    > & { members: Pick<User, 'id' | 'name'>[] })[];
    //팀이 없는 유저
    noTeamUsers: Pick<User, 'id' | 'name'>[];
    // 팀 리스트
    teams: {
        id: FinaleTeam['id'];
        members: Pick<FinaleTeamMember, 'id' | 'name' | 'role'>[];
        submitted: boolean;
        projectBoardId: string | null;
    }[];
};
// 파이널 프로젝트 상세조회 응답 타입
export type FinaleProjectDetailResponse = Pick<
    FinaleProject,
    'id' | 'title' | 'description' | 'url' | 'createdAt' | 'finaleTeamId'
> & {
    members: Pick<FinaleTeamMember, 'id' | 'name' | 'role'>[];
    boards: Pick<
        FinaleProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    >[];
};
// 파이널 프로젝트 보드 상세조회 응답 타입
export type FinaleProjectBoardDetailResponse = Pick<
    FinaleProjectBoard,
    'id' | 'title' | 'summary' | 'content' | 'createdAt'
> & {
    members: Pick<FinaleTeamMember, 'id' | 'name' | 'role'>[];
};

export type MyFinaleProjectResponse = Pick<
    FinaleProject,
    'id' | 'title' | 'createdAt'
>;

// [REQUEST]
// 파이널 프로젝트 생성 요청 타입 (팀 + 프로젝트)
export type FinaleProjectCreate = Pick<
    FinaleProject,
    'title' | 'description' | 'url'
> & { teams: TeamMemberListRequest };

// 파이널 프로젝트 팀 수정 요청 타입
export type FinaleProjectTeamUpdate = {
    leaderId: User['id'];
    memberIds: User['id'][];
};
// 파이널 프로젝트 수정 요청 타입
export type FinaleProjectUpdate = Pick<
    FinaleProject,
    'title' | 'description' | 'url'
>;

// 파이널 프로젝트 보드 생성, 수정 요청 타입
export type FinaleProjectBoardRequest = Pick<
    FinaleProjectBoard,
    'title' | 'summary' | 'content' | 'thumbnail'
>;
