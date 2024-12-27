import { LoginSchema, RegisterSchema } from '@/types/auth/schema';

export interface AuthResponseType {
    accessToken: string;
    refreshToken: string;
}

export type LoginRequestType = LoginSchema;
export type RegisterRequestType = RegisterSchema;
export type OAuthDomainType = 'google' | 'kakao' | 'naver';
