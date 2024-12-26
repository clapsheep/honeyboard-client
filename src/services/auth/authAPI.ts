import axios, { AxiosResponse } from 'axios';
import {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    OAuthDomain,
} from './types';

const { VITE_BASE_API, VITE_BASE_URI } = import.meta.env;

// credential 로그인 요청
export const loginAPI = async (
    data: LoginRequest,
): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>(`${VITE_BASE_API}/auth/login`, data);
};

// credential 회원가입 요청
export const signupAPI = async (
    data: RegisterRequest,
): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>(`${VITE_BASE_API}/auth/signup`, data);
};

// oauth 로그인 요청
export const requestOAuthAPI = (domain: OAuthDomain): void => {
    window.location.href = `${VITE_BASE_URI}/oauth2/authorization/${domain}`;
};

// oauth 회원가입 요청
export const OAuthAPI = async (
    domain: OAuthDomain,
    name: string,
): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>(
        `${VITE_BASE_API}/auth/${domain}/signup`,
        {
            name,
        },
        { withCredentials: true },
    );
};

// logout 요청
export const logoutAPI = async (): Promise<AxiosResponse<void>> => {
    return axios.post(`${VITE_BASE_API}/auth/logout`);
};

// email 전송 요청
export const sendEmailAPI = async (
    email: string,
): Promise<AxiosResponse<boolean>> => {
    return axios.post(`${VITE_BASE_API}/auth/email/send`, { email });
};

// Todo: email verify 타입 만들어서 적용
export const verifyEmailAPI = async (
    email: string,
    code: string,
): Promise<AxiosResponse<boolean>> => {
    return axios.post(`${VITE_BASE_API}/auth/email/verify`, { email, code });
};
