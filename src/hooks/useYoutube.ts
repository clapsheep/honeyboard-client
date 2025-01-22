import {
    addMusicAPI,
    deleteMusicAPI,
    getMusicList,
    searchMusicAPI,
} from '@/api/youtubeAPI';
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useAuth } from './useAuth';

// 본인 기수 플레이리스트 서스펜스
export const useSuspenseYoutubeList = () => {
    const { userInfo } = useAuth();
    const { data } = useSuspenseQuery({
        queryKey: ['musicList', userInfo?.generationId],
        queryFn: getMusicList,
    });
    return { data };
};
// 본인 기수 플레이리스트 : 플리 추가 삭제 시 대조할 데이터
export const useGetYoutubeList = () => {
    const { userInfo } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['musicList', userInfo?.generationId],
        queryFn: () => getMusicList(),
    });
    return { data, isLoading };
};

// 노래 검색 결과 리스트
export const useSearchYoutube = (keyword: string, isSearch: boolean) => {
    const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);

    const { data, isLoading, fetchNextPage, error, isError } = useInfiniteQuery(
        {
            queryKey: ['search-music', keyword],
            initialPageParam: '',
            queryFn: ({ pageParam = '' }) =>
                searchMusicAPI({ keyword, pageToken: pageParam }),
            getNextPageParam: (lastPage) => lastPage.nextPageToken,
            enabled: isSearch && !isQuotaExceeded, // 쿼터 초과시 요청 중지
            retry: (_, error: AxiosError) => {
                // 403 에러인 경우
                if (error?.response?.status === 403) {
                    setIsQuotaExceeded(true);
                    return false; // 재시도 하지 않음
                }
                return true; // 다른 에러는 재시도
            },
        },
    );

    return { data, isLoading, fetchNextPage, error, isError, isQuotaExceeded };
};

// 노래 추가 삭제
export const useMusicMutation = () => {
    const { userInfo } = useAuth();
    const queryClient = useQueryClient();
    const { mutate: addMusic, isPending: isAddPending } = useMutation({
        mutationFn: (data: {
            videoId: string;
            title: string;
            channel: string;
        }) => addMusicAPI(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['musicList', userInfo?.generationId],
            });
        },
    });

    const { mutate: deleteMusic, isPending: isDeletePending } = useMutation({
        mutationFn: (id: string) => deleteMusicAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['musicList', userInfo?.generationId],
            });
        },
    });

    return {
        addMusic,
        deleteMusic,
        isAddPending,
        isDeletePending,
        isPending: isAddPending || isDeletePending,
    };
};
