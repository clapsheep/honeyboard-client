import { getFinaleProjectListAPI } from '@/api/finaleAPI';
import { useQuery } from '@tanstack/react-query';

export const useFinalProejctList = (generationId: string) => {
    const { data } = useQuery({
        queryKey: ['finalProject'],
        queryFn: () => getFinaleProjectListAPI({ generationId }),
    });

    return data;
};
