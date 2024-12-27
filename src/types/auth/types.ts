import { UserInfo } from '@/stores/userStore';
import { LoginSchema, RegisterSchema } from '@/types/auth/schema';

export type AuthResponseType = UserInfo;
export type LoginRequestType = LoginSchema;
export type RegisterRequestType = Omit<RegisterSchema, 'confirmPassword'>;
export type OAuthDomainType = 'google' | 'kakao' | 'naver';
