import { getUserInfoAPI } from '@/api/authAPI';
import { queryClient } from '@/utils/common/queryClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const LoginCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await queryClient.fetchQuery({
                queryKey: ['auth'],
                queryFn: getUserInfoAPI,
            });

            if (auth.isAuthenticated) {
                navigate('/');
            } else {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    return null;
};

export default LoginCallback;
