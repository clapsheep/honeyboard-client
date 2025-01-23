import { BookmarkedResponse } from './common';

export interface AlgorithmSolution {
    id: string;
    title: string;
    summary: string;
    content: string;
    userId: string;
    runtime: string;
    memory: string;
    languageId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    problemId: string;
}

export type AlgorithmSolutionListResponse = Pick<
    AlgorithmSolution,
    'id' | 'title' | 'memory' | 'runtime' | 'languageId'
> & {
    subtitle: string;
    languageName: string;
};
export type MyAlgorithmSolutionResponse = Pick<
    AlgorithmSolution,
    'id' | 'title' | 'memory' | 'runtime' | 'languageId'
> & { problemTitle: string };

export type AlgorithmSolutionDetailResponse = Pick<
    AlgorithmSolution,
    | 'id'
    | 'title'
    | 'summary'
    | 'content'
    | 'memory'
    | 'runtime'
    | 'languageId'
    | 'createdAt'
> & {
    authorId: AlgorithmSolution['userId'];
    name: string;
    languageName: string;
} & BookmarkedResponse;

export type AlgorithmSolutionRequest = Pick<
    AlgorithmSolution,
    'title' | 'summary' | 'content' | 'memory' | 'runtime' | 'languageId'
>;
