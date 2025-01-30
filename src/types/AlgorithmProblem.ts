import { AlgorithmSolutionListResponse } from './AlgorithmSolution';
import { BookmarkedResponse } from './common';
import { TagResponse } from './Tag';

export interface AlgorithmProblem {
    id: string;
    title: string;
    url: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export type AlgorithmProblemListResponse = Pick<
    AlgorithmProblem,
    'id' | 'title' | 'url' | 'createdAt'
> & { tags: TagResponse[] };

export type AlgorithmProblemDetailResponse = Pick<
    AlgorithmProblem,
    'id' | 'title' | 'url' | 'createdAt'
> & { algorithmSolutionList: AlgorithmSolutionListResponse[] } & {
    tags: TagResponse[];
} & BookmarkedResponse;

export type AlgorithmProblemRequest = Pick<
    AlgorithmProblem,
    'title' | 'url'
> & { tags: TagResponse[] };
