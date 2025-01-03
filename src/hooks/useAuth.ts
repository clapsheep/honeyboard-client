import { getUserInfoAPI, logoutAPI } from '@/services/auth';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { data, isSuccess, isError } = useSuspenseQuery({
        queryKey: ['auth'],
        queryFn: getUserInfoAPI,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: false,
    });
    console.log(data);

    const logout = async () => {
        await logoutAPI();
        queryClient.setQueryData(['auth'], { isAuthenticated: false });
    };
    return {
        isSuccess,
        isError,
        isAuthenticated: data?.isAuthenticated ?? false,
        userInfo: data?.userInfo,
        logout,
    };
};
