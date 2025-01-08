import { AlgorithmSolutionListResponse } from './AlgorithmSolution';
import { TagRequest, TagResponse } from './Tag';

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

export type AlgorithmProblemDetailRespones = Pick<
    AlgorithmProblem,
    'id' | 'title' | 'url' | 'createdAt'
> & { algorithmSolutionList: AlgorithmSolutionListResponse[] } & {
    tags: TagResponse[];
};

export type AlgorithmProblemRequest = Pick<AlgorithmProblem, 'title' | 'url'> &
    TagRequest[];
