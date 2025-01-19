import { api } from '@/utils/common/axiosInstance';
import {
    AlgorithmSolutionListResponse,
    AlgorithmSolutionDetailResponse,
    AlgorithmSolutionRequest,
} from '@/types/AlgorithmSolution';
import { PageRequest, PageResponse } from '@/types/common';

export interface AlgorithmSolutionRequestParams {
    pageRequest?: PageRequest;
    searchRequest?: {
        language?: string | string[];
        generationId?: string;
        sortType?: 'memory' | 'runtime' | 'latest';
    };
}

export const getAlgorithmSolutionListAPI = async (
    req: {
        problemId: string | null;
    },
    {
        pageRequest = { currentPage: 1, pageSize: 9 },
        searchRequest,
    }: AlgorithmSolutionRequestParams,
): Promise<PageResponse<AlgorithmSolutionListResponse>> => {
    const { data } = await api.get(
        `/algorithm/problem/${req.problemId}/solution`,
        {
            params: {
                ...pageRequest,
                ...searchRequest,
            },
            paramsSerializer: (params) => {
                const queryString = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        queryString.append(key, value.join(','));
                    } else if (value !== undefined) {
                        queryString.append(key, value as string);
                    }
                });
                return queryString.toString();
            },
        },
    );
    return data;
};

export const getAlgorithmSolutionDetailAPI = async (req: {
    problemId: string;
    solutionId: string;
}): Promise<AlgorithmSolutionDetailResponse> => {
    const { data } = await api.get(
        `/algorithm/problem/${req.problemId}/solution/${req.solutionId}`,
    );
    return data;
};
export const createAlgorithmSolutionAPI = async (req: {
    problemId: string;
    data: AlgorithmSolutionRequest;
}): Promise<unknown> => {
    return api.post(`/algorithm/problem/${req.problemId}/solution`, req.data);
};

export const updateAlgorithmSolutionAPI = async (req: {
    problemId: string;
    solutionId: string;
    data: AlgorithmSolutionRequest;
}): Promise<unknown> => {
    return api.put(
        `/algorithm/problem/${req.problemId}/solution/${req.solutionId}`,
        req.data,
    );
};
export const deleteAlgorithmSolutionAPI = async (req: {
    problemId: string;
    solutionId: string;
}): Promise<unknown> => {
    return api.delete(
        `/algorithm/problem/${req.problemId}/solution/${req.solutionId}`,
    );
};
