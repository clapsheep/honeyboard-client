import { User } from './User';

export interface TrackProject {
    id: string;
    title: string;
    objective: string;
    description: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    thumbnail: string;
}
export interface TrackTeam {
    id: string;
    generationId: string;
    trackProjectId: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface TrackTeamMember {
    id: string;
    trackTeamId: string;
    userId: string;
    name: string;
    role: 'LEADER' | 'MEMBER';
    createdAt: string;
}
export interface TrackProjectBoard {
    id: string;
    trackProjectId: string;
    trackTeamId: string;
    url: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    thumbnail: string;
}
// [RESPONSE]
// 트랙프로젝트 리스트 조회 응답 타입
export type TrackProjectListResponse = Pick<
    TrackProject,
    'id' | 'title' | 'thumbnail' | 'createdAt'
>[];
// 트랙프로젝트 상세조회 응답 타입
export type TrackProjectDetailResponse = Pick<
    TrackProject,
    'id' | 'title' | 'objective' | 'description' | 'createdAt'
> & {
    noTeamUsers: Pick<User, 'id' | 'name'>[];
    teams: {
        id: TrackTeam['id'];
        members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
        submitted: boolean;
        projectBoardId: string | null;
    }[];
    boards: (Pick<
        TrackProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    > & {
        members: Pick<User, 'id' | 'name'>[];
    })[];
};

// 트랙프로젝트 보드 상세조회 응답 타입
export type TrackProjectBoardDetailResponse = Pick<
    TrackProjectBoard,
    'id' | 'title' | 'url' | 'content' | 'createdAt' | 'trackTeamId'
> & {
    members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
};

// 나의 트랙프로젝트 조회 응답 타입
export type MyTrackProjectResponse = Pick<
    TrackProject,
    'title' | 'thumbnail'
> & {
    trackTeam: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
    trackTeamId: string;
    trackProjectName: string;
    trackProjectId: string;
    boardId: string;
};

// [REQUEST]
// 트랙프로젝트 생성, 수정 요청 타입
export type TrackProjectRequest = Pick<
    TrackProject,
    'title' | 'objective' | 'description'
> & { excludedMembers: number[] };

export type TrackProjectResponse = {
    id: number;
};

// 트랙프로젝트 보드 생성, 수정 요청 타입
export type TrackProjectBoardRequest = Pick<
    TrackProjectBoard,
    'title' | 'url' | 'content' | 'thumbnail'
>;
