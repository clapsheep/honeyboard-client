import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

interface useMyPageProps<T> {
    queryFn: (userId: string) => Promise<T>;
    queryKey: string;
}

const useMyPage = <T>({ queryFn, queryKey }: useMyPageProps<T>) => {
    // 추후에 타입 확장 필요
    const { userInfo } = useAuth();

    const { data } = useSuspenseQuery({
        queryKey: [queryKey, userInfo?.userId],
        queryFn: () => queryFn(userInfo!.userId),
    });
    console.log(data);

    return { data };
};

export default useMyPage;
