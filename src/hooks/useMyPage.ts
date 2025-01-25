import { useSuspenseQuery } from '@tanstack/react-query';

interface useMyPageProps<T> {
    queryFn: Promise<T>;
    queryKey: string;
}

const useMyPage = <T>({ queryFn, queryKey }: useMyPageProps<T>) => {
    // 추후에 타입 확장 필요

    const { data } = useSuspenseQuery({
        queryKey: [queryKey],
        queryFn: () => queryFn,
    });

    return { data };
};

export default useMyPage;
