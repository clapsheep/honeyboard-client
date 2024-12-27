import axios, { AxiosResponse } from 'axios';
import {
    LoginRequestType,
    RegisterRequestType,
    OAuthDomainType,
    AuthResponseType,
} from './types';

const { VITE_BASE_API } = import.meta.env;

// credential 로그인 요청
export const loginAPI = async (
    data: LoginRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
    return axios.post<AuthResponseType>(`${VITE_BASE_API}/auth/login`, data);
};

// credential 회원가입 요청
export const signupAPI = async (
    data: RegisterRequestType,
): Promise<AxiosResponse<AuthResponseType>> => {
    return axios.post<AuthResponseType>(`${VITE_BASE_API}/auth/signup`, data);
};

// oauth 회원가입 요청
export const OAuthAPI = async (
    domain: OAuthDomainType,
    name: string,
): Promise<AxiosResponse<AuthResponseType>> => {
    return axios.post<AuthResponseType>(
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
