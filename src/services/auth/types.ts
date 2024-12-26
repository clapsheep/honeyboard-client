import { LoginSchema, RegisterSchema } from '@/types/schemas/authSchema';

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export type LoginRequest = LoginSchema;
export type RegisterRequest = RegisterSchema;
export type OAuthDomain = 'google' | 'kakao' | 'naver';
