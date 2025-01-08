import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useGenerationStore } from '@/stores/generationStore';
import {
    activeGenerationAPI,
    addGenerationAPI,
    deleteGenerationAPI,
} from '@/api/adminAPI';
import { getGenerationListAPI } from '@/api/generationAPI';

export const useGenerationQuery = () => {
    const setGenerationList = useGenerationStore(
        (state) => state.setGenerationList,
    );

    const query = useQuery({
        queryKey: ['generations'],
        queryFn: getGenerationListAPI,
        staleTime: 0,
        refetchOnMount: true,
        gcTime: 10 * 60 * 1000,
    });

    useEffect(() => {
        if (query.data) {
            setGenerationList(query.data);
        }
    }, [query.data]);

    return query;
};

export const useGenerationMutations = () => {
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addGenerationAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteGenerationAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });

    const activeMutation = useMutation({
        mutationFn: activeGenerationAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });

    return { addMutation, deleteMutation, activeMutation };
};
