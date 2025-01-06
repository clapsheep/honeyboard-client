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

export type TrackProjectListResponse = Pick<
    TrackProject,
    'id' | 'title' | 'thumbnail' | 'createdAt'
>;

export type TrackProjectDetailResponse = Pick<
    TrackProject,
    'id' | 'title' | 'objective' | 'description' | 'createdAt'
> & {
    noTeamUsers: Pick<User, 'id' | 'name'>[];
    teams: {
        members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
        submitted: boolean;
        projectBoardId: string | null;
    };
    boards: Pick<
        TrackProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    > &
        {
            members: Pick<User, 'id' | 'name'>[];
        }[];
};
export type TrackProjectBoardDetailResponse = Pick<
    TrackProjectBoard,
    'id' | 'title' | 'url' | 'content' | 'createdAt' | 'trackTeamId'
> & {
    members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
};
// 트랙프로젝트 작성 로직에 따른 정의가 또 달라질 듯함
