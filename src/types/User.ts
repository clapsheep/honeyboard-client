export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    genrationId: string;
    role: 'ADMIN' | 'USER';
    loginType: 'GOOGLE' | 'NAVER' | 'FORM';
    isSsafy: boolean;
    createdAt: string;
}

export type AvailableUserListResponse = Pick<User, 'id' | 'name'>[];
export type TeamMemberListRequest = {
    leaderId: string;
    memberIds: string[];
};
export interface StudentType {
    userId: number;
    name: string;
    generationId: number;
    generationName?: string;
    email: string;
    ssafy: boolean;
}
