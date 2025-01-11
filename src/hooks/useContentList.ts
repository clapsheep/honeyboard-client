import { PageRequest, PageResponse } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export interface UseContentListProps<T> {
    contentType: 'web_guide' | 'web_recommend' | 'algo_solution' | 'algo_guide';
    getListAPI: (req: {
        pageRequest: PageRequest;
        generationId?: string | null;
        searchTitle?: string;
    }) => Promise<PageResponse<T>>;
}
export const useContentList = <T>({
    contentType,
    getListAPI,
}: UseContentListProps<T>) => {
    const { data } = useQuery<PageResponse<T>, Error>({
        queryKey: [contentType],
        queryFn: () => getListAPI({}),
    });
};
