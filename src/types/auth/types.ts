import { LoginSchema, RegisterSchema } from '@/types/auth/schema';

export type AuthResponseType = {
    isAuthenticated: boolean;
    userInfo?: UserInfo;
};
export type UserInfo = {
    generationId: string;
    generationName: string;
    role: string;
    name: string;
    userId: string;
};
export type LoginRequestType = LoginSchema;
export type RegisterRequestType = Omit<RegisterSchema, 'confirmPassword'>;
export type OAuthDomainType = 'google' | 'kakao' | 'naver';
