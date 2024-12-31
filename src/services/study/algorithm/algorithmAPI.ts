import { api } from '@/services/common/axiosInstance';

export const getAlgorithmConceptsAPI = async (generationId: string) => {
    return api.get('/algorithm/concept', {
        params: {
            generationId,
        },
    });
};
