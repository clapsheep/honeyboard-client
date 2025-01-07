import { loginAPI } from '@/api/authAPI';
import { LoginSchema, OAuthDomainType } from '@/types/auth';
import { NavigateFunction } from 'react-router';

const { VITE_BASE_URI } = import.meta.env;

// oauth 로그인 요청
export const requestOAuth = (domain: OAuthDomainType): void => {
    window.location.href = `${VITE_BASE_URI}/oauth2/authorization/${domain}`;
};

export const handleLogin = async (
    data: LoginSchema,
    navigate: NavigateFunction,
) => {
    try {
        const res = await loginAPI(data);
        if (res.status === 200) {
            navigate('/login/callback');
        }
        return;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('로그인에 실패했습니다');
    }
};
