import { LoginSchema, OAuthDomainType } from '@/types/auth';
import { loginAPI, logoutAPI } from '@/services/auth/authAPI';
import { UserStoreType } from '@/stores/userStore';
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

export const handleLogout = async (
    setUserState: UserStoreType['setUserInfo'],
) => {
    try {
        const res = await logoutAPI();
        if (res.status === 200) {
            setUserState(null);
            window.location.href = '/login';
        }
        return;
    } catch (error) {
        console.error('Logout failed:', error);
        throw new Error('로그아웃에 실패했습니다');
    }
};
