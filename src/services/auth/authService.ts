import { OAuthDomainType } from '../../types/auth/types';
const { VITE_BASE_URI } = import.meta.env;
// oauth 로그인 요청
export const requestOAuth = (domain: OAuthDomainType): void => {
    window.location.href = `${VITE_BASE_URI}/oauth2/authorization/${domain}`;
};
