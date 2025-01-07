import { api } from '@/services/common/axiosInstance';
import { PageResponse } from '@/types/common/type';
import {
    AlgorithmProblemDetailRespones,
    AlgorithmProblemListResponse,
    AlgorithmProblemRequest,
} from '@/types/new/AlgorithmProblem';
import { PageRequest, SearchRequest } from '@/types/new/common';

export interface AlgorithmProblemRequestParams<T> {
    pageRequest?: PageRequest;
    searchRequest?: SearchRequest<T>;
}
export const getAlgorithmProblemListAPI = async ({
    pageRequest = { currentPage: 1, pageSize: 16 },
    searchRequest,
}: AlgorithmProblemRequestParams<'tag' | 'url'>): Promise<
    PageResponse<AlgorithmProblemListResponse>
> => {
    const { data } = await api.get(`/algorithm/problem`, {
        params: { ...pageRequest, ...searchRequest },
    });
    return data;
};

export const getAlgorithmProblemDetailAPI = async (req: {
    problemId: string;
}): Promise<AlgorithmProblemDetailRespones> => {
    const { data } = await api.get(`/algorithm/problem/${req.problemId}`);
    return data;
};

export const createAlgorithmProblemAPI = async (req: {
    data: AlgorithmProblemRequest;
}): Promise<unknown> => {
    return api.post(`/algorithm/problem`, req.data);
};

export const updateAlgorithmProblemAPI = async (req: {
    problemId: string;
    data: AlgorithmProblemRequest;
}): Promise<unknown> => {
    return api.put(`/algorithm/problem/${req.problemId}`, req.data);
};

export const deleteAlgorithmProblemAPI = async (req: {
    problemId: string;
}): Promise<unknown> => {
    return api.delete(`/algorithm/problem/${req.problemId}`);
};
