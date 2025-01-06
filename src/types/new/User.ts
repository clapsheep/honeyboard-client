export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    genrationId: string;
    role: 'ADMIN' | 'USER';
    loginType: 'GOOGLE' | 'NAVER' | 'FORM';
    isSsafy: boolean;
    createdAt: string;
}
