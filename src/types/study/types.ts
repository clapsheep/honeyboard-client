export interface Tag {
    id: string;
    name: string;
}

export interface AlgorithmConcept {
    id: string;
    title: string;
    thumbnail: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export interface AlgorithmProblem {
    id: string;
    title: string;
    url: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    tags: Tag[];
}

export interface AlgorithmSolution {
    solutionId: string;
    problemId: string;
    title: string;
    summary: string;
    userId: string;
    Author: string;
    runtime: string;
    memory: string;
    languageId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isBookmarked: boolean;
}

export interface AlgorithmConceptDetail extends AlgorithmConcept {
    content: string;
}

export interface AlgorithmSolutionDetail extends AlgorithmSolution {
    content: string;
}

export interface WebRecommend {
    id: string;
    title: string;
    url: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}
export interface WebConcept {
    id: string;
    title: string;
    userId: string;
    thumbnail: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface WebRecommendDetail extends WebRecommend {
    content: string;
}
export interface WebConceptDetail extends WebConcept {
    content: string;
}
export interface bookMarkType {
    contentType: contentType;
    contentId: string;
}
export type contentType =
    | 'algo_guide'
    | 'algo_solution'
    | 'web_guide'
    | 'web_recommend';
