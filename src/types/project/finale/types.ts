export interface TeamUser {
    userId: number;
    email?: string;
    password?: string;
    name: string;
    generationId?: string;
    generationName?: string;
    role?: string;
    loginType?: string;
    isSsafy?: boolean;
    teamId?: number;
    createdAt?: string;
}
