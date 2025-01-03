import { api } from '@/services/common/axiosInstance';
import {
    LoginRequestType,
    RegisterRequestType,
    OAuthDomainType,
    AuthResponseType,
} from '@/types/auth';
import { AxiosResponse } from 'axios';

export const getUserInfoAPI = async (): Promise<AuthResponseType> => {
    try {
        const { data } = await api.get('/user/info');
        return { userInfo: data, isAuthenticated: true };
    } catch (error) {
        console.error(error);
        return { userInfo: undefined, isAuthenticated: false };
    }
};
// credential 로그인 요청
export const loginAPI = async (
    data: LoginRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);
    return api.post<AuthResponseType>('/auth/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        maxRedirects: 0,
    });
};

// credential 회원가입 요청
export const signupAPI = async (
    data: RegisterRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
    return api.post<AuthResponseType>('/auth/signup', data);
};

// oauth 회원가입 요청
export const OAuthAPI = async (
    domain: OAuthDomainType,
    name: string,
): Promise<AxiosResponse<AuthResponseType>> => {
    return api.post<AuthResponseType>(`/auth/${domain}/signup`, { name });
};

// logout 요청
export const logoutAPI = async (): Promise<AxiosResponse<void>> => {
    return api.post('/auth/logout');
};

// email 전송 요청
export const sendEmailAPI = async (
    email: string,
): Promise<AxiosResponse<boolean>> => {
    return api.post('/auth/email/send', { email });
};

// email verify 요청
export const verifyEmailAPI = async (
    email: string,
    code: string,
): Promise<AxiosResponse<boolean>> => {
    return api.post('/auth/email/verify', { email, code });
};
