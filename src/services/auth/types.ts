import { LoginSchema, RegisterSchema } from '@/types/schemas/authSchema';

export interface AuthResponseType {
    accessToken: string;
    refreshToken: string;
}

export type LoginRequestType = LoginSchema;
export type RegisterRequestType = RegisterSchema;
export type OAuthDomainType = 'google' | 'kakao' | 'naver';
