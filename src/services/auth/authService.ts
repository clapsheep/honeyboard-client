import { OAuthDomainType } from '../../types/auth/types';
const { VITE_BASE_URI } = import.meta.env;
// oauth 로그인 요청
export const requestOAuth = (domain: OAuthDomainType): void => {
    window.location.href = `${VITE_BASE_URI}/oauth2/authorization/${domain}`;
};

import { LoginSchema } from '@/types/auth';
import { loginAPI } from '@/services/auth/authAPI';

export const handleLogin = async (data: LoginSchema) => {
    try {
        const response = await loginAPI(data);
        localStorage.setItem('isLoggedIn', 'true');
        // 추후에 로그인 성공 시 유저정보 저장 로직 추가
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('로그인에 실패했습니다');
    }
};
