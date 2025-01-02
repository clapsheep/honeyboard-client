import { getGenerationListAPI } from '@/services/common/generation/generationAPI';
import { useQuery } from '@tanstack/react-query';

import { useGenerationStore } from '@/stores/generationStore';

// React Query 훅
export const useGenerationQuery = () => {
    const setGenerationList = useGenerationStore(
        (state) => state.setGenerationList,
    );

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['generations'],
        queryFn: getGenerationListAPI,
        staleTime: 0, // 항상 'stale' 상태로 설정
        refetchOnMount: true, // 마운트 시 재요청
        gcTime: 10 * 60 * 1000,
    });

    if (isSuccess && data) {
        setGenerationList(data);
    }

    return { data, isSuccess, isLoading };
};
