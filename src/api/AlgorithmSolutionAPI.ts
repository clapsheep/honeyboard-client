import { api } from '@/utils/common/axiosInstance';
import {
    AlgorithmSolutionDetailResponse,
    AlgorithmSolutionRequest,
} from '@/types/AlgorithmSolution';

export const getAlgorithmSolutionDetailAPI = async (req: {
    problemId: string;
    solutionId: string;
}): Promise<AlgorithmSolutionDetailResponse> => {
    const { data } = await api.get(`/algorithm/solution/${req.solutionId}`);
    return data;
};
export const createAlgorithmSolutionAPI = async (req: {
    problemId: string;
    data: AlgorithmSolutionRequest;
}): Promise<unknown> => {
    return api.post(`/algorithm/solution/${req.problemId}`, req.data);
};

export const updateAlgorithmSolutionAPI = async (req: {
    problemId: string;
    solutionId: string;
    data: AlgorithmSolutionRequest;
}): Promise<unknown> => {
    return api.put(
        `/algorithm/solution/${req.problemId}/${req.solutionId}`,
        req.data,
    );
};
export const deleteAlgorithmSolutionAPI = async (req: {
    problemId: string;
    solutionId: string;
}): Promise<unknown> => {
    return api.delete(`/algorithm/solution/${req.problemId}/${req.solutionId}`);
};
