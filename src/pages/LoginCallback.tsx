import { getUserInfoAPI } from '@/services/auth';
import { useUserStore } from '@/stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const LoginCallback = () => {
    const { setUserInfo } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLoginCallback = async () => {
            try {
                const { data } = await getUserInfoAPI();
                setUserInfo(data);
                navigate('/');
            } catch (error) {
                console.error('로그인 처리 중 오류 발생:', error);
                navigate('/login');
            }
        };
        handleLoginCallback();
    }, [navigate, setUserInfo]);

    return null;
};

export default LoginCallback;
