import { api } from '@/utils/common/axiosInstance';
import {
    AlgorithmProblemDetailResponse,
    AlgorithmProblemListResponse,
    AlgorithmProblemRequest,
} from '@/types/AlgorithmProblem';
import { PageRequest, PageResponse, SearchRequest } from '@/types/common';

export interface AlgorithmProblemRequestParams<T> {
    pageRequest?: PageRequest;
    searchRequest?: SearchRequest<T>;
}
export const getAlgorithmProblemListAPI = async ({
    pageRequest = { currentPage: 1, pageSize: 16 },
    searchRequest,
}: AlgorithmProblemRequestParams<'tag' | 'title'>): Promise<
    PageResponse<AlgorithmProblemListResponse>
> => {
    const { data } = await api.get(`/algorithm/problem`, {
        params: { ...pageRequest, ...searchRequest },
    });
    return data;
};

export const getAlgorithmProblemDetailAPI = async (req: {
    problemId: string;
}): Promise<AlgorithmProblemDetailResponse> => {
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
